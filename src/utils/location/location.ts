// This module handles location based functionality

// Params
const geolocation = navigator.geolocation;

// Get the users current location
export function getUserLocation(): Promise<Position> {
  return new Promise(res => {
    geolocation.getCurrentPosition(p => res(p));
  });
}

export function setUserLocation (state, c: Coordinates) {
  const { latitude, longitude } = c;
  state = { latitude, longitude, ...state };
  state.map.setView([latitude, longitude], state.startingZoom);
}
