// F1.2.2 Runtime Preview Toggle
// Development switch between legacy scene and World Runtime preview.

export const runtimePreviewConfig = {
  enabled: false,
  mode: 'legacy',
};

export function enableRuntimePreview() {
  runtimePreviewConfig.enabled = true;
  runtimePreviewConfig.mode = 'runtime';
}

export function disableRuntimePreview() {
  runtimePreviewConfig.enabled = false;
  runtimePreviewConfig.mode = 'legacy';
}

export function isRuntimePreviewEnabled() {
  return runtimePreviewConfig.enabled;
}
