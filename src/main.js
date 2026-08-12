import { createAppScene } from './scene/scene.js?v=13.8.2';
import { createDopamineMolecule } from './molecule/dopamine.js?v=13.8.2';
import { createFireflies } from './effects/fireflies.js?v=13.8.2';
import { playMoleculeIntro } from './effects/transitions.js';

const app = createAppScene(document.querySelector('#stage'));

const molecule = createDopamineMolecule(app.scene);
createFireflies(app.scene);

const intro = playMoleculeIntro(molecule.molecule);
app.transitions = [intro];

app.cameraController.showMolecule(molecule.molecule, 1.6);

app.start();
