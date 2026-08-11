export const ATOM_TYPES = {
  C: { radius: 0.12 },
  O: { radius: 0.15 },
  H: { radius: 0.075 }
};

export function atom(id, element, position) {
  return { id, element, position };
}
