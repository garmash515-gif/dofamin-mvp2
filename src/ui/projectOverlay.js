export function createProjectOverlay() {
  const root = document.createElement('div');
  root.id = 'project-overlay';
  root.style.cssText = `position:fixed;inset:0;z-index:20;pointer-events:none;color:white;font-family:Arial,sans-serif;padding:24px;`;

  root.innerHTML = `
    <div style="text-shadow:0 0 18px rgba(255,255,255,.8)">
      <div style="font-size:54px">⚛</div>
      <h1 style="margin:0;letter-spacing:8px;font-size:42px">DOPAMIN</h1>
      <p style="margin:5px 0;opacity:.75">ИССЛЕДУЙ СВОЁ СОСТОЯНИЕ</p>
    </div>

    <div id="journey-hint" style="position:absolute;left:24px;bottom:34px;opacity:.75;font-size:16px">
      Коснись атома, чтобы начать путь
    </div>

    <div id="atom-card" style="position:absolute;right:24px;bottom:30px;padding:18px 22px;border-radius:18px;background:rgba(0,0,0,.35);backdrop-filter:blur(8px);opacity:0;transition:.3s">
      <div style="font-size:12px;opacity:.7">ТОЧКА ПУТИ</div>
      <div id="atom-name" style="font-size:28px">АТОМ</div>
      <div id="atom-description">Открой следующий этап</div>
    </div>

    <div id="diagnostic" style="position:absolute;top:20px;right:20px;background:rgba(0,0,0,.45);padding:12px;border-radius:12px;font-size:12px;line-height:18px">
      SYSTEM<br>
      ✓ THREE<br>
      ✓ SCENE<br>
      ✓ MOLECULE<br>
      ✓ BLOOM<br>
      ✓ JOURNEY UI
    </div>`;

  window.addEventListener('atom-active', (event) => {
    const card = root.querySelector('#atom-card');
    const name = root.querySelector('#atom-name');
    const description = root.querySelector('#atom-description');

    name.textContent = event.detail.type || 'ATOM';
    description.textContent = 'Следующий шаг открыт';
    card.style.opacity = '1';

    setTimeout(() => card.style.opacity = '0', 2500);
  });

  document.body.appendChild(root);
  return root;
}
