import * as THREE from 'three';

export class ReferenceSpace {
  constructor(scene, url = '/dofamin-mvp2/assets/dopamine-reference.png') {
    this.scene = scene;
    this.url = url;
    this.group = new THREE.Group();
    this.markers = [];
  }

  load() {
    return new Promise((resolve, reject) => {
      new THREE.TextureLoader().load(this.url, (texture) => {
        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(10, 10),
          new THREE.MeshBasicMaterial({map:texture, transparent:true, opacity:0.65, side:THREE.DoubleSide})
        );
        this.group.add(plane);
        this.plane = plane;
        this.scene.add(this.group);
        resolve(this);
      }, undefined, reject);
    });
  }

  addMarker(position, data = {}) {
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.08,16,16), new THREE.MeshBasicMaterial({color:0x00ffff}));
    marker.position.copy(position);
    marker.userData = data;
    this.group.add(marker);
    this.markers.push(marker);
    return marker;
  }

  exportMarkers() {
    return this.markers.map((m,i)=>({id:m.userData.id || `marker_${i+1}`, position:m.position.toArray(), data:m.userData}));
  }
}
