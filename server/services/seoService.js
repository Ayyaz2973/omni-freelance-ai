const { askOllama } = require('./ollamaService');
const prompts = require('../utils/prompts');

async function generateSEOContent(topic, keywords) {
  const prompt = prompts.seo({ topic, keywords });
  const result = await askOllama(prompt);
  return result;
}

module.exports = { generateSEOContent };
