// This module is used to interact with the Zomato api
//
import { Coordinates } from '../types';

// Move to Env
const apiKey: string = '129bc0569dfc22502d379d7881792082';
const zomatoUrl: string = 'https://developers.zomato.com/api/v2.1/';

// Options for making a request against the Zomato api
const zomatoRequestOtps = {
  headers: {
    'content-type': 'application/json',
    'user-key': apiKey,
  }
};

// Get all entries near to a location
export function getNearby(geoLocation: Coordinates) {
  const {latitude = 53.35, longitude = -6.27} = geoLocation;
  const url = `${zomatoUrl}/geocode?lat=${latitude}&lon=${longitude}`;
  return fetch(url, zomatoRequestOtps);
}

export function getAllRestaurants(geoLocation: Coordinates, { results_start = "" }): Promise<Object<any>> {
  const {latitude = 53.35, longitude = -6.27} = geoLocation;
  const url = `${zomatoUrl}/search?entity_id=91&entity_type=city&lat=${latitude}&lon=${longitude}&start=${results_start}`;
  return fetch(url, zomatoRequestOtps);
}
