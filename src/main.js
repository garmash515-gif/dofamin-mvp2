import { createAppScene } from './scene/scene.js';
import { createDopamineMolecule } from './molecule/dopamine.js';
import { createFireflies } from './effects/fireflies.js';

const app = createAppScene(document.querySelector('#stage'));

createDopamineMolecule(app.scene);
createFireflies(app.scene);

app.start();
