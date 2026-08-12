export function attachAtomPulse({ molecule }) {
  if (!molecule) return;

  const target = molecule.molecule || molecule;
  target.userData.active = false;

  const flash = () => {
    target.userData.active = true;
    const oldScale = target.scale.clone();
    target.scale.multiplyScalar(1.18);

    setTimeout(() => {
      target.scale.copy(oldScale);
      target.userData.active = false;
    }, 420);

    window.dispatchEvent(new CustomEvent('atom-active', {
      detail: {
        label: 'АКТИВНЫЙ АТОМ',
        energy: '+20%',
        focus: '+15%'
      }
    }));
  };

  target.traverse?.((obj) => {
    obj.userData.clickable = true;
  });

  window.addEventListener('pointerdown', flash, { once: false });
}
