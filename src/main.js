import { createAppScene } from './scene/scene.js?v=13.8.3';
import { createDopamineMolecule } from './molecule/dopamine.js?v=13.8.3';
import { createFireflies } from './effects/fireflies.js?v=13.8.3';
import { enableAtomTap } from './interaction/tapAtom.js?v=13.8.3';

const app = createAppScene(document.querySelector('#stage'));

const molecule = createDopamineMolecule(app.scene);
createFireflies(app.scene);

app.cameraController.showMolecule(molecule.molecule, 1.6);

enableAtomTap(document.querySelector('#stage'), app.camera, molecule, (atom) => {
  console.log('ACTIVE ATOM', atom.userData.element || 'atom');
});

app.start();
