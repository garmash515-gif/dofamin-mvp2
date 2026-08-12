import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createAtomInteraction({ camera, renderer, molecule, cameraController }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function log(message) {
    window.dispatchEvent(new CustomEvent('debug-log', { detail: message }));
  }

  function activate(atom) {
    atom.scale.setScalar(1.35);
    atom.userData.active = true;

    const material = atom.userData.material || atom.children[0]?.material;
    if (material && material.emissiveIntensity !== undefined) {
      material.emissiveIntensity = 2.5;
    }

    log(`ATOM ACTIVE: ${atom.userData.type || 'unknown'}`);
  }

  function onPointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(molecule.children, true);

    const hit = hits.find(item => item.object.parent?.userData?.type || item.object.userData?.type);

    if (!hit) {
      log('TAP: no atom');
      return;
    }

    const atom = hit.object.parent?.userData?.type ? hit.object.parent : hit.object;

    activate(atom);

    if (cameraController?.focusPoint) {
      cameraController.focusPoint(atom.position, 1.4, true);
      log('CAMERA: focus point');
    } else {
      log('CAMERA: focus unavailable');
    }
  }

  renderer.domElement.addEventListener('pointerdown', onPointer);

  log('INPUT: atom interaction ready');

  return { activate };
}
