require('dotenv').config();

const config = {
  baseURL: process.env.OLLAMA_URL || 'http://localhost:11434',
  defaultModel: process.env.DEFAULT_MODEL || 'llama3',
  codeModel: process.env.CODE_MODEL || 'deepseek-coder',
  endpoints: {
    generate: '/api/generate',
    chat: '/api/chat',
  },
};

module.exports = config;
