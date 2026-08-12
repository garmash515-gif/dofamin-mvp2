import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createAtomInteraction({ camera, renderer, molecule, cameraController }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function activate(atom) {
    atom.scale.setScalar(1.35);
    atom.userData.active = true;
    if (atom.material?.emissiveIntensity !== undefined) {
      atom.material.emissiveIntensity = 2.5;
    }
  }

  function onPointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(molecule.children, true);

    const atom = hits.find(hit => hit.object.userData.element)?.object;
    if (!atom) return;

    activate(atom);
    cameraController.focusObject(atom, 1.4);
  }

  renderer.domElement.addEventListener('pointerdown', onPointer);

  return { activate };
}
