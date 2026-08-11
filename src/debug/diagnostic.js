export function createDiagnostic() {
  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.top = '10px';
  panel.style.left = '10px';
  panel.style.zIndex = '9999';
  panel.style.padding = '10px';
  panel.style.font = '12px monospace';
  panel.style.color = '#9cff9c';
  panel.style.background = 'rgba(0,0,0,.65)';
  panel.style.border = '1px solid rgba(156,255,156,.4)';
  panel.style.borderRadius = '8px';
  panel.textContent = 'BOOT\n';
  document.body.appendChild(panel);

  const lines = [];

  function log(name, ok, info = '') {
    lines.push(`${ok ? '✓' : '✗'} ${name} ${info}`);
    panel.textContent = lines.join('\n');
  }

  window.addEventListener('error', (e) => log('JS ERROR', false, e.message));
  window.addEventListener('unhandledrejection', (e) => log('PROMISE', false, e.reason));

  return { log };
}
