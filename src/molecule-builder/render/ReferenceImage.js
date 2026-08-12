import * as THREE from 'three';

export function createReferenceImage(scene, {
  url = '/dofamin-mvp2/dopamine-reference.png',
  transform = {}
} = {}) {
  if (!scene) return null;

  const loader = new THREE.TextureLoader();

  const texture = loader.load(url);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const geometry = new THREE.PlaneGeometry(10, 10);
  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.x = transform.rotationX ?? 0;
  mesh.position.set(
    ...(transform.position ?? [0, 0, -1])
  );
  mesh.scale.setScalar(transform.scale ?? 1);

  scene.add(mesh);

  return {
    type: 'reference-image',
    url,
    texture,
    object: mesh,
    transform
  };
}
