function renderSidebar(activePage) {
  const links = [
    { href: '/', icon: '&#9776;', label: 'Dashboard' },
    { href: '/pages/chat.html', icon: '&#128172;', label: 'AI Chat' },
    { href: '/pages/proposal.html', icon: '&#128221;', label: 'Proposal Generator' },
    { href: '/pages/seo.html', icon: '&#128200;', label: 'SEO Writer' },
    { href: '/pages/code.html', icon: '&#128187;', label: 'Code Assistant' },
    { href: '/pages/pdf.html', icon: '&#128196;', label: 'PDF Tools' },
    { href: '/pages/voice.html', icon: '&#127908;', label: 'Voice AI' },
  ];

  const navLinks = links
    .map(
      (link) => `
    <a href="${link.href}" class="${activePage === link.label ? 'active' : ''}">
      <span class="icon">${link.icon}</span>
      ${link.label}
    </a>
  `
    )
    .join('');

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>OmniFreelance AI</h1>
        <p>Local AI Freelancing Assistant</p>
      </div>
      <nav class="sidebar-nav">
        ${navLinks}
      </nav>
      <div class="sidebar-footer">
        <div class="status-indicator">
          <span class="status-dot" id="statusDot"></span>
          <span id="statusText">Checking Ollama...</span>
        </div>
      </div>
    </aside>
  `;
}

async function checkStatus() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (data.ollama && data.ollama.running) {
      dot.classList.add('online');
      text.textContent = 'Ollama Online';
    } else {
      dot.classList.remove('online');
      text.textContent = 'Ollama Offline';
    }
  } catch (e) {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (dot) dot.classList.remove('online');
    if (text) text.textContent = 'Server Offline';
  }
}
