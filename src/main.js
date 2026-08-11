import { createAppScene } from './scene/scene.js?v=13.8.1';
import { createDopamineMolecule } from './molecule/dopamine.js?v=13.8.1';
import { createFireflies } from './effects/fireflies.js?v=13.8.1';

const app = createAppScene(document.querySelector('#stage'));

createDopamineMolecule(app.scene);
createFireflies(app.scene);

app.start();
