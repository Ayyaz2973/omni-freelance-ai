function renderNavbar(title) {
  return `
    <nav class="navbar">
      <button class="menu-toggle" onclick="toggleSidebar()">&#9776;</button>
      <h2>${title}</h2>
      <select class="model-select" id="modelSelect" onchange="changeModel(this.value)">
        <option value="llama3">llama3</option>
        <option value="mistral">mistral</option>
        <option value="deepseek-coder">deepseek-coder</option>
      </select>
    </nav>
  `;
}

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

function changeModel(model) {
  window.currentModel = model;
}
