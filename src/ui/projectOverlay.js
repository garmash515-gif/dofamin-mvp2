export function createProjectOverlay() {
  const root = document.createElement('div');
  root.id = 'project-overlay';
  root.innerHTML = `
    <div class="brand">
      <div class="logo">⚛</div>
      <div>
        <h1>DOPAMIN</h1>
        <p>ПУТЬ К ВПЕЧАТЛЕНИЯМ</p>
      </div>
    </div>
    <div class="states">
      <span>⚡ Энергия</span>
      <span>◉ Фокус</span>
      <span>✦ Мотивация</span>
      <span>☼ Удовольствие</span>
    </div>`;
  document.body.appendChild(root);
  return root;
}
