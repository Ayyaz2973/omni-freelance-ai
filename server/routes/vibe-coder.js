const express = require('express');
const router = express.Router();
const path = require('path');
const archiver = require('archiver');
const {
  generateProject,
  getProjectFiles,
  getProjectDir,
  listProjects
} = require('../services/vibeCoderService');
const { formatResponse, handleError } = require('../utils/helpers');

router.post('/generate', async (req, res) => {
  try {
    const { description, projectType, features } = req.body;

    if (!description) {
      return res
        .status(400)
        .json(formatResponse('Project description is required', 'error'));
    }

    const result = await generateProject(
      description,
      projectType || 'website',
      features || []
    );

    res.json(
      formatResponse({
        projectId: result.projectId,
        files: result.files,
        metadata: result.metadata
      })
    );
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/project/:id', (req, res) => {
  try {
    const project = getProjectFiles(req.params.id);
    if (!project) {
      return res.status(404).json(formatResponse('Project not found', 'error'));
    }
    res.json(formatResponse(project));
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/preview/:id', (req, res) => {
  try {
    const project = getProjectFiles(req.params.id);
    if (!project) {
      return res.status(404).json(formatResponse('Project not found', 'error'));
    }

    const indexFile = project.files.find(
      (f) =>
        f.filename === 'index.html' ||
        f.filename.endsWith('/index.html')
    );

    if (!indexFile) {
      return res.status(404).json(
        formatResponse('No index.html found in project', 'error')
      );
    }

    let html = indexFile.content;

    const cssFile = project.files.find(
      (f) => f.filename === 'style.css' || f.filename === 'styles.css'
    );
    if (cssFile && !html.includes(cssFile.content.substring(0, 50))) {
      html = html.replace(
        '</head>',
        `<style>${cssFile.content}</style>\n</head>`
      );
    }

    const jsFile = project.files.find(
      (f) =>
        f.filename === 'script.js' ||
        f.filename === 'app.js' ||
        f.filename === 'main.js'
    );
    if (jsFile && !html.includes(jsFile.content.substring(0, 50))) {
      html = html.replace(
        '</body>',
        `<script>${jsFile.content}</script>\n</body>`
      );
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/download/:id', (req, res) => {
  try {
    const projectDir = getProjectDir(req.params.id);
    if (!projectDir) {
      return res.status(404).json(formatResponse('Project not found', 'error'));
    }

    const archive = archiver('zip', { zlib: { level: 9 } });
    const projectName = req.params.id;

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${projectName}.zip"`
    );

    archive.pipe(res);
    archive.directory(projectDir, projectName, (entry) => {
      if (entry.name.includes('.vibe-meta.json')) return false;
      return entry;
    });
    archive.finalize();
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/list', (req, res) => {
  try {
    const projects = listProjects();
    res.json(formatResponse({ projects }));
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
