import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createAppScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 4.2);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0x9bd8ff, 0x10051f, 1.5));

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  return {
    scene,
    camera,
    renderer,
    start() {
      function loop() {
        renderer.render(scene, camera);
        requestAnimationFrame(loop);
      }
      loop();
    }
  };
}
