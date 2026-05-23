let currentMode = 'chat';

function setMode(mode) {
  currentMode = mode;
}

async function sendRequest() {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');

  output.innerText = 'Generating...';

  let endpoint = '/api/chat';
  let body = {};

  if (currentMode === 'chat') {
    endpoint = '/api/chat';
    body = {
      prompt: input,
      model: 'llama3'
    };
  }

  if (currentMode === 'proposal') {
    endpoint = '/api/proposal';
    body = {
      jobTitle: 'Freelance Job',
      description: input
    };
  }

  if (currentMode === 'seo') {
    endpoint = '/api/seo';
    body = {
      topic: input
    };
  }

  if (currentMode === 'code') {
    endpoint = '/api/code';
    body = {
      task: input
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  output.innerText = JSON.stringify(data, null, 2);
}
