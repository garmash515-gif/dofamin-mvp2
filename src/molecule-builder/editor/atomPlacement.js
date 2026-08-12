// Atom Placement Layer
// Stores atom coordinates selected from the molecule builder grid.

export const atomPlacement = {
  atoms: [],

  addAtom({ id, element, position }) {
    const atom = {
      id,
      element,
      position: [position[0], position[1], position[2]]
    };

    this.atoms.push(atom);
    return atom;
  },

  updateAtomPosition(id, position) {
    const atom = this.atoms.find(item => item.id === id);

    if (!atom) return null;

    atom.position = [position[0], position[1], position[2]];
    return atom;
  },

  getAtoms() {
    return this.atoms;
  }
};
