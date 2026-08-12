import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';
import { createCameraAnchor, focusFromAnchor } from '../camera/cameraAnchors.js';
import { getStep } from '../journey/journeyEngine.js';
import { createJourneyTransition, startJourneyTransition } from '../journey/journeyTransition.js';
import { updateAtomEnergy } from '../molecule/atom.js';

export function createAtomInteraction({ camera, renderer, molecule, cameraController }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const activePulses = [];
  let activeAtom = null;

  function log(message) {
    window.dispatchEvent(new CustomEvent('debug-log', { detail: message }));
  }

  function syncBonds() {
    (molecule.userData.bonds || []).forEach((bond) => {
      if (bond.object?.userData?.update) bond.object.userData.update();
    });
  }

  function getAtomViews() {
    const map = molecule.userData.atomMap;
    if (map) return Object.fromEntries(map.entries());
    return Object.fromEntries(
      molecule.children
        .filter(child => child?.userData?.journeyStep)
        .map(child => [child.userData.id, child])
    );
  }

  function setActiveVisual(atom) {
    if (activeAtom && activeAtom !== atom) {
      activeAtom.userData.active = false;
      updateAtomEnergy(activeAtom, performance.now() / 1000, false);
      activeAtom.scale.setScalar(1);
    }

    activeAtom = atom;
    atom.userData.active = true;
    atom.userData.available = false;
    atom.scale.setScalar(1.35);

    const material = atom.userData.material;
    if (material) {
      material.emissiveIntensity = Math.max(
        atom.userData.baseEmissiveIntensity ?? 0.04,
        3.8
      );
    }
  }

  function markNextAvailable(atomId) {
    const map = molecule.userData.atomMap;
    const next = getAtomViews()[atomId];
    if (!next || next === activeAtom) return;

    next.userData.available = true;
    next.userData.active = false;
    next.userData.journeyState = 'available';
  }

  function activate(atom) {
    const journeyStep = atom.userData.journeyStep;
    if (!journeyStep) return log(`ТАП: технический атом ${atom.userData.id || 'неизвестный'}`);

    setActiveVisual(atom);

    const anchor = atom.userData.cameraAnchor || createCameraAnchor(atom);
    atom.userData.cameraAnchor = anchor;
    focusFromAnchor(cameraController, anchor);
    syncBonds();

    const step = getStep(journeyStep);
    if (!step) return log(`JOURNEY: этап не найден ${journeyStep}`);

    window.dispatchEvent(new CustomEvent('journey-step-active', {
      detail: { step, stepId: step.id, atomId: atom.userData.id, label: atom.userData.journeyLabel }
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

    const transition = createJourneyTransition(journeyStep, getAtomViews());

    if (!transition) {
      log(`JOURNEY: переход не создан для ${journeyStep}`);
      return;
    }

    const pulse = startJourneyTransition(transition);
    if (pulse) {
      activePulses.push(pulse);
      molecule.add(pulse);
      window.dispatchEvent(new CustomEvent('energy-started', { detail: transition }));
      markNextAvailable(transition.toAtom);
      log(`ЭНЕРГИЯ: ${transition.fromAtom} → ${transition.toAtom}`);
    } else if (transition.terminal) {
      window.dispatchEvent(new CustomEvent('journey-complete', { detail: transition }));
      log('JOURNEY: МАГИЯ — финальный этап');
    }

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
    const hit = hits.find(item => {
      const group = item.object.parent;
      return item.object.userData?.journeyStep || group?.userData?.journeyStep;
    });

    if (!hit) return log('ТАП: атом не найден');

    const atom = hit.object.userData?.journeyStep ? hit.object : hit.object.parent;
    activate(atom);
  }

  function animate(time) {
    const now = time / 1000;
    for (let i = activePulses.length - 1; i >= 0; i--) {
      const pulse = activePulses[i];
      if (!pulse.parent) {
        activePulses.splice(i, 1);
        continue;
      }

      const alive = pulse.userData?.alive;
      if (alive) {
        const progressBefore = pulse.userData.progress;
        const stillAlive = pulse.userData?.start && pulse.userData?.end
          ? (() => {
              pulse.userData.progress += 0.016 * pulse.userData.speed;
              if (pulse.userData.progress >= 1) {
                pulse.userData.progress = 1;
                pulse.userData.alive = false;
                pulse.material.opacity = 0;
                return false;
              }
              pulse.position.lerpVectors(pulse.userData.start, pulse.userData.end, pulse.userData.progress);
              pulse.scale.setScalar(1 + Math.sin(pulse.userData.progress * Math.PI) * 0.8);
              return true;
            })()
          : false;

        if (!stillAlive) {
          pulse.removeFromParent();
          activePulses.splice(i, 1);
          window.dispatchEvent(new CustomEvent('energy-finished', { detail: pulse.userData }));
          continue;
        }
      }
    }

    if (activeAtom) updateAtomEnergy(activeAtom, now, true);
    requestAnimationFrame(animate);
  }

  renderer.domElement.addEventListener('pointerdown', onPointer);
  requestAnimationFrame(animate);
  log('ВВОД: атомы + JOURNEY + ENERGY runtime подключены');

  return { activate, activePulses };
}
