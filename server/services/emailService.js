const { askOllama } = require('./ollamaService');
const prompts = require('../utils/prompts');

async function generateEmail(type, context, tone) {
  const prompt = prompts.email({ type, context, tone });
  const result = await askOllama(prompt);
  return result;
}

module.exports = { generateEmail };
