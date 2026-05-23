// Global state
window.currentModel = 'llama3';

// Utility functions
function showLoading(show) {
  const loading = document.getElementById('loading');
  if (loading) loading.classList.toggle('active', show);
}

function setOutput(text) {
  const output = document.getElementById('output');
  if (output) {
    output.textContent = text;
    output.classList.remove('empty');
  }
}

function clearOutput() {
  const output = document.getElementById('output');
  if (output) {
    output.textContent = 'Response will appear here...';
    output.classList.add('empty');
  }
}

function copyOutput() {
  const output = document.getElementById('output');
  if (!output || output.classList.contains('empty')) return;

  navigator.clipboard.writeText(output.textContent).then(() => {
    showToast('Copied to clipboard!', 'success');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = output.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Copied to clipboard!', 'success');
  });
}

function showToast(message, type) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = 'toast ' + type + ' show';

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Check Ollama status on page load
async function checkOllamaStatus() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');

    if (dot && text) {
      if (data.ollama && data.ollama.running) {
        dot.classList.add('online');
        text.textContent = 'Ollama Online';
      } else {
        dot.classList.remove('online');
        text.textContent = 'Ollama Offline';
      }
    }

    // Update model select with available models
    if (data.models && data.models.length > 0) {
      const select = document.getElementById('modelSelect');
      if (select) {
        const currentValue = select.value;
        select.innerHTML = '';
        data.models.forEach((model) => {
          const option = document.createElement('option');
          option.value = model;
          option.textContent = model;
          select.appendChild(option);
        });
        if (data.models.includes(currentValue)) {
          select.value = currentValue;
        }
      }
    }
  } catch (e) {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (dot) dot.classList.remove('online');
    if (text) text.textContent = 'Server Offline';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkOllamaStatus();
  setInterval(checkOllamaStatus, 30000);
});
