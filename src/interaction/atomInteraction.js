import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';
import { createCameraAnchor, focusFromAnchor } from '../camera/cameraAnchors.js';
import { getStep } from '../journey/journeyEngine.js';
import { createJourneyTransition, startJourneyTransition } from '../journey/journeyTransition.js';

export function createAtomInteraction({ camera, renderer, molecule, cameraController }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const activePulses = [];

  function log(message) {
    window.dispatchEvent(new CustomEvent('debug-log', { detail: message }));
  }

  function syncBonds() {
    (molecule.userData.bonds || []).forEach((bond) => {
      if (bond.object?.userData?.update) bond.object.userData.update();
    });
  }

  function updateVisualState(atom) {
    atom.scale.setScalar(1.35);
    atom.userData.active = true;

    const material = atom.userData.material || atom.children[0]?.material;
    if (material?.emissiveIntensity !== undefined) {
      material.emissiveIntensity = 3.5;
    }
  }

  function activate(atom) {
    const journeyStep = atom.userData.journeyStep;
    if (!journeyStep) return log(`ТАП: технический атом ${atom.userData.id || 'неизвестный'}`);

    updateVisualState(atom);

    const anchor = atom.userData.cameraAnchor || createCameraAnchor(atom);
    atom.userData.cameraAnchor = anchor;
    focusFromAnchor(cameraController, anchor);
    syncBonds();

    const step = getStep(journeyStep);

    window.dispatchEvent(new CustomEvent('journey-step-active', {
      detail: {
        step,
        stepId: step.id,
        atomId: atom.userData.id,
        label: atom.userData.journeyLabel
      }
    }));

    window.dispatchEvent(new CustomEvent('atom-active', {
      detail: {
        type: atom.userData.type || 'АТОМ',
        energy: '+20%',
        focus: '+15%',
        journeyStep: step.id,
        title: step.title
      }
    }));

    const transition = createJourneyTransition(journeyStep, {
      [atom.userData.id]: atom
    });

    const pulse = startJourneyTransition(transition);
    if (pulse) {
      activePulses.push(pulse);
      molecule.add(pulse);
      window.dispatchEvent(new CustomEvent('energy-started', {
        detail: transition
      }));
    }

    log(`ЭТАП: ${step.title}`);
    log(`АТОМ: ${atom.userData.id}`);
    log('КАМЕРА: якорь фокуса');
    log('ЭНЕРГИЯ: переход запущен');

    const bonds = molecule.userData.bonds || [];
    bonds.filter(b => b.start === atom || b.end === atom).forEach((b, i) => {
      setTimeout(() => {
        b.trigger?.();
        window.dispatchEvent(new CustomEvent('journey-link-active', {
          detail: { from: atom.userData.id, bond: b, journeyStep: step.id }
        }));
      }, i * 140);
    });
  }

  function onPointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(molecule.children, true);
    const hit = hits.find(item => item.object.parent?.userData?.type || item.object.userData?.type);

    if (!hit) return log('ТАП: атом не найден');

    const atom = hit.object.parent?.userData?.type ? hit.object.parent : hit.object;
    activate(atom);
  }

  renderer.domElement.addEventListener('pointerdown', onPointer);
  log('ВВОД: управление атомами + JOURNEY TRANSITION готово');

  return { activate, activePulses };
}
