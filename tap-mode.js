// DOPAMIN tap interaction layer
// Loads on top of the 3D scene when connected.

export function enableAtomTap({ THREE, camera, scene, renderer }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let active = null;

  function pulse(object) {
    if (!object) return;
    const start = object.scale.x;
    let t = 0;
    function animate(){
      t += 0.08;
      const s = start + Math.sin(t) * 0.12;
      object.scale.setScalar(s);
      if (t < Math.PI * 2) requestAnimationFrame(animate);
      else object.scale.setScalar(start);
    }
    animate();
  }

  window.addEventListener('pointerdown', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObjects(scene.children, true);
    if (!hits.length) return;

    active = hits[0].object;
    pulse(active);

    window.dispatchEvent(new CustomEvent('atom-active', {
      detail: { object: active }
    }));
  });
}
