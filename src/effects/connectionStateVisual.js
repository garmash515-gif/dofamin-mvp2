// DOPAMIN — Block V3
// Visual state mapping for journey connections.

export const CONNECTION_STATES = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

export function getConnectionVisualState(state) {
  switch (state) {
    case CONNECTION_STATES.ACTIVE:
      return {
        opacity: 1,
        intensity: 1,
        pulse: true,
        energy: true
      };

    case CONNECTION_STATES.AVAILABLE:
      return {
        opacity: 0.65,
        intensity: 0.4,
        pulse: true,
        energy: false
      };

    case CONNECTION_STATES.COMPLETED:
      return {
        opacity: 0.85,
        intensity: 0.6,
        pulse: false,
        energy: false
      };

    case CONNECTION_STATES.LOCKED:
    default:
      return {
        opacity: 0.15,
        intensity: 0,
        pulse: false,
        energy: false
      };
  }
}

export function applyConnectionVisual(connection, state) {
  const visual = getConnectionVisualState(state);

  if (!connection) return visual;

  connection.userData.connectionState = state;
  connection.userData.visual = visual;

  return visual;
}
