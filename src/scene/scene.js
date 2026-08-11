import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createAppScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, .1, 100);
  camera.position.z = 5;

  scene.add(new THREE.HemisphereLight(0x9bd8ff, 0x10051f, 1.5));

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
