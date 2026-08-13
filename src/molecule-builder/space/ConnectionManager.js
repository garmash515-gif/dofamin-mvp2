import * as THREE from 'three';

export class ConnectionManager {
  constructor(group) {
    this.group = group;
    this.connections = [];
  }

  addConnection(a, b, data = {}) {
    const start = new THREE.Vector3(...a);
    const end = new THREE.Vector3(...b);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();

    const geometry = new THREE.CylinderGeometry(0.015, 0.015, length, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff
    });

    const line = new THREE.Mesh(geometry, material);
    line.position.copy(start).add(end).multiplyScalar(0.5);
    line.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );

    line.userData = data;
    this.group.add(line);

    const connection = {
      start: a,
      end: b,
      data,
      object: line
    };

    this.connections.push(connection);
    return connection;
  }

  exportConnections() {
    return this.connections.map((item, index) => ({
      id: item.data.id || `connection_${index + 1}`,
      start: item.start,
      end: item.end,
      data: item.data
    }));
  }
}
