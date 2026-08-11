import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/postprocessing/OutputPass.js';

export function createPostProcessing(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new OutputPass());
  return composer;
}
