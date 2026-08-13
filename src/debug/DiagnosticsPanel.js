export function createDiagnosticsPanel(diagnostics = {}) {
  const panel = document.createElement('div');

  panel.id = 'runtime-diagnostics-panel';
  panel.style.position = 'fixed';
  panel.style.top = '12px';
  panel.style.right = '12px';
  panel.style.zIndex = '9999';
  panel.style.padding = '12px';
  panel.style.background = 'rgba(0,0,0,0.75)';
  panel.style.color = '#fff';
  panel.style.fontFamily = 'monospace';
  panel.style.fontSize = '12px';
  panel.style.borderRadius = '8px';

  panel.innerHTML = `
    <div>RUNTIME STATUS</div>
    <hr/>
    <div>Scene: ${diagnostics.scene ? 'OK' : 'WAIT'}</div>
    <div>Camera: ${diagnostics.camera ? 'OK' : 'WAIT'}</div>
    <div>Reference PNG: ${diagnostics.reference ? 'OK' : 'WAIT'}</div>
    <div>Grid: ${diagnostics.grid ? 'OK' : 'WAIT'}</div>
    <div>Markers: ${diagnostics.markers ?? 0}</div>
  `;

  document.body.appendChild(panel);
  return panel;
}
