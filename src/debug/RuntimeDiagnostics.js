export class RuntimeDiagnostics {
  constructor() {
    this.items = [];
    this.enabled = true;
  }

  check(name, status, details = '') {
    this.items.push({
      name,
      status: Boolean(status),
      details
    });

    return status;
  }

  report() {
    return {
      time: new Date().toISOString(),
      checks: this.items
    };
  }

  mountPanel() {
    if (!this.enabled || document.getElementById('runtime-diagnostics')) return;

    const panel = document.createElement('div');
    panel.id = 'runtime-diagnostics';
    panel.style.position = 'fixed';
    panel.style.top = '10px';
    panel.style.right = '10px';
    panel.style.zIndex = '9999';
    panel.style.background = 'rgba(0,0,0,.75)';
    panel.style.color = '#fff';
    panel.style.padding = '10px';
    panel.style.fontFamily = 'monospace';
    panel.style.fontSize = '12px';

    panel.innerHTML = '<b>RUNTIME STATUS</b><br>';
    this.items.forEach(item => {
      panel.innerHTML += `${item.status ? '✓' : '✗'} ${item.name}<br>`;
    });

    document.body.appendChild(panel);
  }
}
