function renderFeatureCard(icon, title, description, link) {
  return `
    <div class="card" onclick="window.location.href='${link}'">
      <div class="card-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;
}
