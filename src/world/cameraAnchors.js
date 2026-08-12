// DOPAMIN — V11 Camera Anchors
// Director layer: camera positions belong to world points, not UI or screen center.

export const CAMERA_ANCHORS = {
  C1: {
    position: [0, 0, 3],
    lookAt: [0, 0, 0],
    distance: 3
  },
  C2: {
    position: [1.4, 0.9, 2.8],
    lookAt: [1.0, 0.3, 0],
    distance: 2.8
  },
  C3: {
    position: [2.2, -0.4, 2.6],
    lookAt: [1.7, -0.1, 0],
    distance: 2.6
  },
  C4: {
    position: [1.3, -1.2, 2.7],
    lookAt: [1.0, -0.9, 0],
    distance: 2.7
  },
  C7: {
    position: [0.3, -1.7, 2.9],
    lookAt: [0.2, -1.5, 0],
    distance: 2.9
  },
  C8: {
    position: [-0.7, -2.1, 2.8],
    lookAt: [-0.8, -1.9, 0],
    distance: 2.8
  },
  N1: {
    position: [-1.5, -2.5, 3],
    lookAt: [-1.5, -2.3, 0],
    distance: 3
  },
  O1: {
    position: [-1.2, 0.8, 3],
    lookAt: [-1.2, 0.8, 0],
    distance: 3
  }
};

export function getCameraAnchor(id) {
  return CAMERA_ANCHORS[id] || null;
}
