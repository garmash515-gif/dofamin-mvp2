import { createAppScene } from './scene/scene.js?v=13.8.2';
import { createMoleculeBuilder } from './molecule-builder/index.js';

const app = createAppScene(document.querySelector('#stage'));

// New architecture only:
// Legacy dopamine molecule, journey, effects and interactions are disabled.
// Current stage: reference + coordinate grid calibration.
window.DOPAMIN_MOLECULE_BUILDER = createMoleculeBuilder(app.scene);

app.start();
