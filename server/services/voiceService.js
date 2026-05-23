const { askOllama } = require('./ollamaService');

async function processVoiceText(text, action) {
  let prompt;

  switch (action) {
    case 'respond':
      prompt = `You are a helpful voice assistant. Respond naturally and concisely to: ${text}`;
      break;
    case 'summarize':
      prompt = `Summarize the following spoken text concisely: ${text}`;
      break;
    case 'translate':
      prompt = `Translate the following to Urdu: ${text}`;
      break;
    default:
      prompt = `You are a helpful voice assistant. Respond to: ${text}`;
  }

  const result = await askOllama(prompt);
  return result;
}

module.exports = { processVoiceText };
