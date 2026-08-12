// Dopamine molecule definition
// Coordinates will be filled from the calibrated reference grid.
// This file is the single source of truth for atoms and bonds.

export const dopamineDefinition = {
  atoms: [
    {
      id: "C1",
      element: "carbon",
      position: [0, 0, 0],
      role: "ring"
    },
    {
      id: "C2",
      element: "carbon",
      position: [0, 0, 0],
      role: "ring"
    },
    {
      id: "C3",
      element: "carbon",
      position: [0, 0, 0],
      role: "ring"
    },
    {
      id: "O1",
      element: "oxygen",
      position: [0, 0, 0],
      role: "hydroxyl"
    },
    {
      id: "O2",
      element: "oxygen",
      position: [0, 0, 0],
      role: "hydroxyl"
    },
    {
      id: "N1",
      element: "nitrogen",
      position: [0, 0, 0],
      role: "amine"
    }
  ],

  bonds: [
    { from: "C1", to: "C2" },
    { from: "C2", to: "C3" },
    { from: "C3", to: "O1" },
    { from: "C3", to: "O2" },
    { from: "C3", to: "N1" }
  ],

  anchors: []
};
