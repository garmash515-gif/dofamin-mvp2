import { createRuntimePreview } from './runtimePreview.js';

/**
 * Runtime injection bridge.
 * Keeps legacy molecule untouched while allowing the World Runtime
 * layer to attach objects into the active scene.
 */
export function injectRuntimePreview({ scene, stepId = 'CORE' }) {
  if (!scene) return null;

  const preview = createRuntimePreview(scene, stepId);

  if (preview) {
    preview.userData = {
      ...(preview.userData || {}),
      runtimeInjected: true,
      runtimeStep: stepId
    };
  }

  return preview;
}
