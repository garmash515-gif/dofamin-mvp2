export function saveMarkers(markers) {
  localStorage.setItem('dopamine_space_markers', JSON.stringify(markers));
}

export function loadMarkers() {
  const raw = localStorage.getItem('dopamine_space_markers');
  return raw ? JSON.parse(raw) : [];
}
