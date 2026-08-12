import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';
import { createCameraAnchor, focusFromAnchor } from '../camera/cameraAnchors.js';

export function createAtomInteraction({ camera, renderer, molecule, cameraController }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function log(message) {
    window.dispatchEvent(new CustomEvent('debug-log', { detail: message }));
  }

  function syncBonds() {
    (molecule.userData.bonds || []).forEach((bond) => {
      if (bond.object?.userData?.update) bond.object.userData.update();
    });
  }

  function activate(atom) {
    atom.scale.setScalar(1.35);
    atom.userData.active = true;

    const material = atom.userData.material || atom.children[0]?.material;
    if (material?.emissiveIntensity !== undefined) material.emissiveIntensity = 3.5;

    const anchor = atom.userData.cameraAnchor || createCameraAnchor(atom);
    atom.userData.cameraAnchor = anchor;

    focusFromAnchor(cameraController, anchor);

    window.dispatchEvent(new CustomEvent('atom-active', {
      detail: { type: atom.userData.type || 'ATOM', energy: '+20%', focus: '+15%' }
    }));

    log(`ATOM ACTIVE: ${atom.userData.type || 'unknown'}`);
    log('CAMERA: anchor focus');

    const bonds = molecule.userData.bonds || [];
    bonds.filter(b => b.start === atom || b.end === atom).forEach((b, i) => {
      setTimeout(() => b.trigger?.(), i * 120);
    });
  }

  function onPointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(molecule.children, true);
    const hit = hits.find(item => item.object.parent?.userData?.type || item.object.userData?.type);

    if (!hit) return log('TAP: no atom');

    const atom = hit.object.parent?.userData?.type ? hit.object.parent : hit.object;
    activate(atom);
  }

  renderer.domElement.addEventListener('pointerdown', onPointer);
  log('INPUT: anchor interaction ready');
  return { activate };
}
