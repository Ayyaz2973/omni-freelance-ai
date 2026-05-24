const { askOllama } = require('./ollamaService');
const config = require('../config/ollama');
const prompts = require('../utils/prompts');
const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '../../generated-projects');

if (!fs.existsSync(PROJECTS_DIR)) {
  fs.mkdirSync(PROJECTS_DIR, { recursive: true });
}

function generateProjectId() {
  return 'vibe-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8);
}

function parseGeneratedFiles(response) {
  const files = [];
  const fileRegex = /---FILE:\s*(.+?)\s*---\n([\s\S]*?)(?=---FILE:|---END---|\n---FILE:|\n---END---|$)/g;
  let match;

  while ((match = fileRegex.exec(response)) !== null) {
    const filename = match[1].trim();
    let content = match[2].trim();
    if (content.endsWith('---END')) {
      content = content.slice(0, -6).trim();
    }
    if (filename && content) {
      files.push({ filename, content });
    }
  }

  if (files.length === 0) {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let blockMatch;
    const codeBlocks = [];

    while ((blockMatch = codeBlockRegex.exec(response)) !== null) {
      codeBlocks.push({
        language: blockMatch[1] || 'txt',
        content: blockMatch[2].trim()
      });
    }

    if (codeBlocks.length > 0) {
      const extMap = {
        html: 'index.html',
        css: 'style.css',
        javascript: 'script.js',
        js: 'script.js',
        json: 'package.json',
        java: 'MainActivity.java',
        kotlin: 'MainActivity.kt',
        xml: 'layout.xml',
        python: 'app.py',
        jsx: 'App.jsx',
        tsx: 'App.tsx'
      };

      const usedNames = new Set();
      codeBlocks.forEach((block) => {
        let filename = extMap[block.language] || `file.${block.language}`;
        if (usedNames.has(filename)) {
          const ext = path.extname(filename);
          const base = path.basename(filename, ext);
          filename = `${base}-${usedNames.size}${ext}`;
        }
        usedNames.add(filename);
        files.push({ filename, content: block.content });
      });
    }
  }

  if (files.length === 0 && response.trim().length > 0) {
    files.push({ filename: 'index.html', content: response.trim() });
  }

  return files;
}

async function generateProject(description, projectType, features) {
  const projectId = generateProjectId();
  const prompt = prompts.vibeCoder({ description, projectType, features });
  const result = await askOllama(prompt, config.codeModel);
  const files = parseGeneratedFiles(result);

  const projectDir = path.join(PROJECTS_DIR, projectId);
  fs.mkdirSync(projectDir, { recursive: true });

  files.forEach((file) => {
    const filePath = path.join(projectDir, file.filename);
    const fileDir = path.dirname(filePath);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(filePath, file.content, 'utf-8');
  });

  const metadata = {
    id: projectId,
    description,
    projectType,
    features,
    files: files.map((f) => f.filename),
    createdAt: new Date().toISOString()
  };
  fs.writeFileSync(
    path.join(projectDir, '.vibe-meta.json'),
    JSON.stringify(metadata, null, 2),
    'utf-8'
  );

  return {
    projectId,
    files,
    metadata
  };
}

function getProjectFiles(projectId) {
  const projectDir = path.join(PROJECTS_DIR, projectId);
  if (!fs.existsSync(projectDir)) return null;

  const metaPath = path.join(projectDir, '.vibe-meta.json');
  if (!fs.existsSync(metaPath)) return null;

  const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  const files = metadata.files.map((filename) => {
    const filePath = path.join(projectDir, filename);
    return {
      filename,
      content: fs.existsSync(filePath)
        ? fs.readFileSync(filePath, 'utf-8')
        : ''
    };
  });

  return { metadata, files };
}

function getProjectDir(projectId) {
  const projectDir = path.join(PROJECTS_DIR, projectId);
  if (!fs.existsSync(projectDir)) return null;
  return projectDir;
}

function listProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs.readdirSync(PROJECTS_DIR)
    .filter((dir) => {
      const metaPath = path.join(PROJECTS_DIR, dir, '.vibe-meta.json');
      return fs.existsSync(metaPath);
    })
    .map((dir) => {
      const meta = JSON.parse(
        fs.readFileSync(path.join(PROJECTS_DIR, dir, '.vibe-meta.json'), 'utf-8')
      );
      return meta;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

module.exports = {
  generateProject,
  getProjectFiles,
  getProjectDir,
  listProjects,
  parseGeneratedFiles
};
