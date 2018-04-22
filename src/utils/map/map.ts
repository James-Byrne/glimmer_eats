// This module manages all functionality on maps
import L from 'leaflet';
import { getNearby, getAllRestaurants } from '../zomato/zomato';
import { Coordinates } from '../types';

// move to env when this is fixed https://github.com/glimmerjs/glimmer-application-pipeline/issues/89
const Env = {
  attribution: '',
  accessToken: 'pk.eyJ1IjoiamFtZXNkZXNieXJuZSIsImEiOiJjamR5dG5qODQxM3VtMzNxcDU1dXdrdmJ3In0.hJM4sfiAwMEC2bndm5JXIg',
  leafletUrl: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  maxZoom: 17,
  startingZoom: 14,
};

// Return a map instance with the view set on a lat/lon
// passed in
export function getMapInstance(e: Element, lat: number = 53.35, lon: number = -6.27, opts = {}): any {
  return L.map(e, opts).setView([lat, lon], Env.startingZoom);
}

// Render a map given a map object
export function renderMap (map): any {
  return L.tileLayer(Env.leafletUrl, {
    attribution: Env.attribution,
    maxZoom: Env.maxZoom,
    id: 'mapbox.streets',
    accessToken: Env.accessToken
  }).addTo(map);
}

// Function which retrieves a list of restaurants for
// a given area, in this case dublin city center
export async function getDublinRestaurants(coords: Coordinates, opts = {}): Promise<Object<any>> {
  const result = await getAllRestaurants(coords, opts);
  return await result.json();
}

// Function which gets a list of nearby restaurants
// The restaurants are fetched using the zomato module
export async function getNearbyRestaurants(coords: Coordinates): Promise<Array<any>> {
  const result = await getNearby(coords);
  return await result.json();
}

export function addRestaurantToMap(map: any, restaurant: any, onClick: Function): any {
  const { location: { latitude, longitude } } = restaurant;
  L.marker([latitude, longitude]).on('click', onClick).addTo(map);
  return restaurant;
}
