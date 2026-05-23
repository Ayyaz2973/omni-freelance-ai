const axios = require('axios');

async function askOllama(prompt, model = 'llama3') {
  try {
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model,
        prompt,
        stream: false,
      }
    );

    return response.data.response;
  } catch (error) {
    console.error(error.message);
    return 'Error connecting to Ollama';
  }
}

module.exports = askOllama;
