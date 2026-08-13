export class ReferenceSpace {
  constructor(scene) {
    this.scene = scene;
    this.reference = null;
    this.markers = [];
  }

  loadReference(path) {
    this.reference = path;
    return path;
  }

  getState() {
    return {
      reference: this.reference,
      markers: this.markers,
    };
  }
}
