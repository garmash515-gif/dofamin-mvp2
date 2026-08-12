import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function enableAtomTap(canvas, camera, molecule, onActivate) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function tap(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(molecule.atoms, true);

    if (!hits.length) return;

    const atom = hits[0].object;
    atom.scale.setScalar(1.45);
    atom.userData.active = true;

    setTimeout(() => atom.scale.setScalar(1), 500);

    if (onActivate) onActivate(atom);
  }

  canvas.addEventListener('pointerdown', tap);
}
