import { createAppScene } from './scene/scene.js?v=13.8.2';
import { createDopamineMolecule } from './molecule/dopamine.js?v=13.8.2';
import { createFireflies } from './effects/fireflies.js?v=13.8.2';
import { playMoleculeIntro } from './effects/transitions.js';
import { createAtomInteraction } from './interaction/atomInteraction.js?v=15.4.3';
import { createProjectOverlay } from './ui/projectOverlay.js';

const app = createAppScene(document.querySelector('#stage'));

const molecule = createDopamineMolecule(app.scene);
createFireflies(app.scene);
createProjectOverlay();

const intro = playMoleculeIntro(molecule.molecule);
app.transitions = [intro];

app.cameraController.showMolecule(molecule.molecule, 1.35);

createAtomInteraction({
  camera: app.camera,
  renderer: app.renderer,
  molecule: molecule.molecule,
  cameraController: app.cameraController
});

app.start();
