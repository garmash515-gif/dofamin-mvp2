// 15.3.2
// Spatial offsets for turning the flat molecular graph into a 3D view.
// Kept separate so geometry can be tuned without changing the chemical graph.

export function apply3DConformation(atoms) {
  const ringZ = [0.08, -0.12, 0.16, -0.08, 0.1, -0.14];

  let ringIndex = 0;
  for (const atom of atoms) {
    if (atom.element === 'C' && ringIndex < ringZ.length) {
      atom.position.z = ringZ[ringIndex++];
    }
  }

  const hetero = atoms.filter(a => a.element === 'O' || a.element === 'N');
  hetero.forEach((atom, i) => {
    atom.position.z += i % 2 === 0 ? 0.22 : -0.22;
  });

  return atoms;
}
