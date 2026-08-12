// DOPAMIN — V10 Runtime Renderer Adapter
// Lightweight runtime layer: takes world definition and delegates rendering.
// Constructor/editor keeps coordinates, objects and bonds. App consumes only this.

export function createRuntimeWorld(worldDefinition, adapters = {}) {
  const { coordinates = {}, objects = {}, bonds = [] } = worldDefinition || {};

  const instances = new Map();

  for (const [id, point] of Object.entries(coordinates)) {
    const config = objects[id];
    if (!config) continue;

    const createObject = adapters[config.type];
    if (!createObject) continue;

    const instance = createObject({
      id,
      point,
      config
    });

    if (instance) {
      instances.set(id, instance);
    }
  }

  const connections = bonds.map((bond) => ({
    from: instances.get(bond.from),
    to: instances.get(bond.to),
    type: bond.type || 'journey'
  })).filter((item) => item.from && item.to);

  return {
    instances,
    connections,
    getObject(id) {
      return instances.get(id) || null;
    }
  };
}
