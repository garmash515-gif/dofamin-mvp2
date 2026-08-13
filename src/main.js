import { createAppScene } from './scene/scene.js?v=13.8.2';
import { createMoleculeBuilder } from './molecule-builder/index.js';
import { RuntimeDiagnostics } from './debug/RuntimeDiagnostics.js';

const diagnostics = new RuntimeDiagnostics();
diagnostics.set('Application', 'starting');

const app = createAppScene(document.querySelector('#stage'));
diagnostics.set('Scene', app?.scene ? 'OK' : 'FAILED');

diagnostics.set('Camera', app?.camera ? 'OK' : 'CHECK');

// New architecture only:
// Legacy dopamine molecule, journey, effects and interactions are disabled.
// Current stage: reference + coordinate grid calibration.
const builder = createMoleculeBuilder(app.scene);
window.DOPAMIN_MOLECULE_BUILDER = builder;

diagnostics.set('Molecule Builder', builder ? 'OK' : 'FAILED');
window.DOPAMIN_DIAGNOSTICS = diagnostics;

app.start();
diagnostics.set('Runtime', 'READY');
