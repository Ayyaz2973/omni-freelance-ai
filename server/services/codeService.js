const { askOllama } = require('./ollamaService');
const config = require('../config/ollama');
const prompts = require('../utils/prompts');

async function generateCode(task, language) {
  const prompt = prompts.code({ task, language });
  const result = await askOllama(prompt, config.codeModel, {
    system: prompts.codeSystem,
    temperature: 0.1,
  });
  return result;
}

module.exports = { generateCode };
