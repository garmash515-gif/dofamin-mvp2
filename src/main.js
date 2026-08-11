import { createAppScene } from './scene/scene.js?v=13.8.2';
import { createDopamineMolecule } from './molecule/dopamine.js?v=13.8.2';
import { createFireflies } from './effects/fireflies.js?v=13.8.2';

const app = createAppScene(document.querySelector('#stage'));

const molecule = createDopamineMolecule(app.scene);
createFireflies(app.scene);

// Camera-controls now frames the actual molecule instead of relying on a fixed
// mobile camera distance. This becomes the base for step-by-step camera travel.
app.cameraController.showMolecule(molecule.molecule, 1.6);

app.start();
