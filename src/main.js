import { createAppScene } from './scene/scene.js?v=13.8.2';
import { createDopamineMolecule } from './molecule/dopamine.js?v=13.8.2';
import { createFireflies } from './effects/fireflies.js?v=13.8.2';
import { playMoleculeIntro } from './effects/transitions.js';
import { createAtomInteraction } from './interaction/atomInteraction.js?v=15.5.0';
import { createProjectOverlay } from './ui/projectOverlay.js';
import { JOURNEY_STEPS } from './journey/journeyEngine.js';
import { createJourneyRuntime } from './journey/journeyRuntime.js';

const app = createAppScene(document.querySelector('#stage'));
const molecule = createDopamineMolecule(app.scene);
createFireflies(app.scene);
createProjectOverlay();

window.DOPAMIN_JOURNEY_STEPS = JOURNEY_STEPS;
window.dispatchEvent(new CustomEvent('journey-ready', { detail: { steps: JOURNEY_STEPS } }));

const intro = playMoleculeIntro(molecule.molecule);
app.transitions = [intro];
app.cameraController.showMolecule(molecule.molecule, 1.35);

const journeyRuntime = createJourneyRuntime({
  cameraController: app.cameraController
});

window.DOPAMIN_JOURNEY_RUNTIME = journeyRuntime;

createAtomInteraction({
  camera: app.camera,
  renderer: app.renderer,
  molecule: molecule.molecule,
  cameraController: app.cameraController,
  onJourneyComplete: () => journeyRuntime.completeCurrentStep()
});

app.start();
