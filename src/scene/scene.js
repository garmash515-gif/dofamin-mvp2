import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';
import { createCameraController } from '../camera/cameraController.js';
import { createPostProcessing } from '../effects/postprocessing.js';
import { createDiagnostic } from '../debug/diagnostic.js';

export function createAppScene(canvas) {
  const debug = createDiagnostic();
  debug.log('THREE', true, 'loaded');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  debug.log('Renderer', true);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 4.2);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0x9bd8ff, 0x10051f, 1.5));
  debug.log('Scene', true);

  const cameraController = createCameraController(camera, renderer);
  debug.log('Camera', true);

  const composer = createPostProcessing(renderer, scene, camera);
  debug.log('Composer', true);

  const transitions = [];

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  return {
    scene, camera, renderer, composer, cameraController, transitions,
    start() {
      const clock = new THREE.Clock();
      function loop() {
        const delta = clock.getDelta();
        cameraController.update(delta);
        transitions.forEach(update => update(delta));
        composer.render();
        requestAnimationFrame(loop);
      }
      loop();
    }
  };
}
