import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createAtomInteraction({ camera, renderer, molecule, cameraController }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function log(message) {
    window.dispatchEvent(new CustomEvent('debug-log', { detail: message }));
  }

  function showAtomCard(atom) {
    window.dispatchEvent(new CustomEvent('atom-active', {
      detail: {
        type: atom.userData.type || 'ATOM',
        energy: '+20%',
        focus: '+15%'
      }
    }));
  }

  function pulse(atom) {
    const start = performance.now();
    const base = atom.scale.x;

    function animate(time) {
      const t = Math.min((time - start) / 500, 1);
      const wave = 1 + Math.sin(t * Math.PI) * 0.25;
      atom.scale.setScalar(base * wave);
      if (t < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function activate(atom) {
    atom.scale.setScalar(1.35);
    atom.userData.active = true;

    const material = atom.userData.material || atom.children[0]?.material;
    if (material && material.emissiveIntensity !== undefined) {
      material.emissiveIntensity = 3.5;
    }

    pulse(atom);
    showAtomCard(atom);
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
    }
  }

  renderer.domElement.addEventListener('pointerdown', onPointer);
  log('INPUT: atom interaction ready');

  return { activate };
}
