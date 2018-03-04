// This module manages all functionality on maps
import L from 'leaflet';
import { getNearby } from '../zomato/zomato';
import { Coordinates } from '../types';

// move to env when this is fixed https://github.com/glimmerjs/glimmer-application-pipeline/issues/89
const Env = {
  attribution: '',
  accessToken: 'pk.eyJ1IjoiamFtZXNkZXNieXJuZSIsImEiOiJjamR5dG5qODQxM3VtMzNxcDU1dXdrdmJ3In0.hJM4sfiAwMEC2bndm5JXIg',
  leafletUrl: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
};

// Create a map instance on the state object passed in
export function createMap(state, element: Element): void {
  state.map = L.map(element).setView([state.latitude, state.longitude], state.startingZoom);
}

// Render a map given a map object
export function renderMap ({ maxZoom, map }): void {
  L.tileLayer(Env.leafletUrl, {
    attribution: Env.attribution,
    maxZoom: maxZoom,
    id: 'mapbox.streets',
    accessToken: Env.accessToken
  }).addTo(map);
}

export async function populateNearby (state, coords: Coordinates) {
  const result = await getNearby(coords);
  const { nearby_restaurants } = await result.json();

  if (nearby_restaurants.length > 0) {
    nearby_restaurants.forEach(r => addRestaurant(state, r.restaurant));
  } else {
    // inform the user no restaurants are nearby
    console.log('Error, no restaurants nearby');
  }
}

// This function takes care of adding a restaurant to a map,
// creating a popover and onClick event for the marker
function addRestaurant ({map, restaurantList, selected}, restaurant): void {
  if (!restaurantList.includes(restaurant.R.res_id)) {
    restaurantList.push(restaurant.R.res_id);
    const { location: { latitude, longitude } } = restaurant;
    L.marker([latitude, longitude])
      .on('click', () => { console.log(selected);selected = restaurant})
      .addTo(map)
  }
}
