// This module handles location based functionality

// Params
const geolocation = navigator.geolocation;

// move to env when this is fixed https://github.com/glimmerjs/glimmer-application-pipeline/issues/89
const Env = { startingZoom: 14, };

// Get the users current location
export function getUserLocation(): Promise<Position> {
  return new Promise(res => geolocation.getCurrentPosition(p => res(p)));
}

export function setUserLocation (map, c: Coordinates) {
  const { latitude, longitude } = c;
  map.setView([latitude, longitude], Env.startingZoom);
  return c;
}
