const { askOllama } = require('./ollamaService');
const prompts = require('../utils/prompts');

async function generateProposal(jobTitle, description, platform) {
  const prompt = prompts.proposal({ jobTitle, description, platform });
  const result = await askOllama(prompt);
  return result;
}

module.exports = { generateProposal };
