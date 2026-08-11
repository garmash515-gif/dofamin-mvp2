import CameraControls from 'https://cdn.jsdelivr.net/npm/camera-controls@2.10.1/+esm';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

CameraControls.install({ THREE });

export function createCameraController(camera, renderer) {
  const controls = new CameraControls(camera, renderer.domElement);
  controls.dampingFactor = 0.08;
  controls.draggingDampingFactor = 0.15;
  controls.smoothTime = 0.25;
  controls.maxDistance = 20;
  controls.minDistance = 0.6;

  function update(delta) {
    controls.update(delta);
  }

  function fitToObject(object, padding = 1.35, smooth = true) {
    const box = new THREE.Box3().setFromObject(object);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    return controls.fitToSphere(sphere, smooth, { padding });
  }

  function focusPoint(point, distance = 1.8, smooth = true) {
    controls.setTarget(point.x, point.y, point.z, smooth);
    return controls.dollyTo(distance, smooth);
  }

  function showMolecule(object, padding = 1.35) {
    return fitToObject(object, padding, true);
  }

  return {
    controls,
    update,
    fitToObject,
    focusPoint,
    showMolecule
  };
}
