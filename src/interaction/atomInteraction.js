import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createAtomInteraction({ camera, renderer, molecule, cameraController }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function activate(atom) {
    atom.scale.setScalar(1.35);
    atom.userData.active = true;

    const material = atom.userData.material || atom.children[0]?.material;
    if (material && material.emissiveIntensity !== undefined) {
      material.emissiveIntensity = 2.5;
    }

    window.dispatchEvent(new CustomEvent('debug-log', {
      detail: `ATOM ACTIVE: ${atom.userData.type || 'unknown'}`
    }));
  }

  function onPointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(molecule.children, true);

    const hit = hits.find(item => {
      return item.object.parent?.userData?.type || item.object.userData?.type;
    });

    if (!hit) {
      window.dispatchEvent(new CustomEvent('debug-log', { detail: 'TAP: no atom' }));
      return;
    }

    const atom = hit.object.parent?.userData?.type
      ? hit.object.parent
      : hit.object;

    activate(atom);
    cameraController.focusObject(atom, 1.4);
  }

  renderer.domElement.addEventListener('pointerdown', onPointer);

  window.dispatchEvent(new CustomEvent('debug-log', {
    detail: 'INPUT: atom interaction ready'
  }));

  return { activate };
}
