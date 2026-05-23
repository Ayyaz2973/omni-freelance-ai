const axios = require('axios');
const config = require('../config/ollama');

async function askOllama(prompt, model, opts = {}) {
  const selectedModel = model || config.defaultModel;

  try {
    const payload = {
      model: selectedModel,
      prompt,
      stream: false,
    };

    if (opts.system) {
      payload.system = opts.system;
    }

    if (opts.temperature !== undefined) {
      payload.options = { temperature: opts.temperature };
    }

    const response = await axios.post(
      `${config.baseURL}${config.endpoints.generate}`,
      payload,
      { timeout: 120000 }
    );

    return response.data.response;
  } catch (error) {
    console.error(`Ollama error (${selectedModel}):`, error.message);
    throw new Error(`Failed to get response from Ollama (${selectedModel}): ${error.message}`);
  }
}

async function checkOllamaStatus() {
  try {
    const response = await axios.get(config.baseURL, { timeout: 5000 });
    return { running: true, message: response.data };
  } catch (error) {
    return { running: false, message: 'Ollama is not running' };
  }
}

async function listModels() {
  try {
    const response = await axios.get(`${config.baseURL}/api/tags`, { timeout: 5000 });
    return response.data.models || [];
  } catch (error) {
    console.error('Failed to list models:', error.message);
    return [];
  }
}

module.exports = { askOllama, checkOllamaStatus, listModels };
