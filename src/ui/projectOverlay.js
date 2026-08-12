export function createProjectOverlay() {
  const root = document.createElement('div');
  root.id = 'project-overlay';
  root.style.cssText = `position:fixed;inset:0;z-index:20;pointer-events:none;color:white;font-family:Arial,sans-serif;padding:24px;`;

  root.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;text-shadow:0 0 12px #fff">
      <div style="font-size:44px">⚛</div>
      <div>
        <h1 style="margin:0;letter-spacing:6px">DOPAMIN</h1>
        <p style="margin:5px 0;opacity:.8">ПУТЬ К ВПЕЧАТЛЕНИЯМ</p>
      </div>
    </div>

    <div style="position:absolute;bottom:30px;left:24px;display:flex;gap:10px;flex-wrap:wrap">
      <span>⚡ Энергия</span>
      <span>◉ Фокус</span>
      <span>✦ Мотивация</span>
      <span>☼ Удовольствие</span>
    </div>

    <div id="diagnostic" style="position:absolute;top:20px;right:20px;background:rgba(0,0,0,.45);padding:12px;border-radius:12px;font-size:12px;line-height:18px">
      SYSTEM<br>
      ✓ THREE<br>
      ✓ SCENE<br>
      ✓ MOLECULE<br>
      ✓ BLOOM<br>
      ✓ UI
    </div>`;

  root.querySelectorAll('span').forEach(x=>{
    x.style.cssText='padding:8px 14px;border:1px solid rgba(255,255,255,.25);border-radius:20px;background:rgba(0,0,0,.25)';
  });

  document.body.appendChild(root);
  return root;
}
