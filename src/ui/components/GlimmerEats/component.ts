import Component, { tracked } from '@glimmer/component';
import { Coordinates } from '../../../utils/types';
import { getNearbyRestaurants, addRestaurantToMap } from '../../../utils/map/map';
import { getUserLocation, setUserLocation } from '../../../utils/location/location';
import { addFavourite, removeFavourite, getFavouritedRestaurants } from '../../../utils/localstorage';

export default class GlimmerEats extends Component {
  // The current route
  @tracked currentRoute: string = 'map';
  @tracked restaurants: any = {};
  @tracked restaurant: any = {};
  @tracked mapsEnabled: boolean = true;
  @tracked userLocation: Coordinates = {
    longitude: -6.27,
    latitude: 53.35,
  };

  @tracked('restaurants')
  get favouriteRestaurants() {
    return (
      Object
      .keys(this.restaurants)
      .filter(k => this.restaurants[k]['favourited'])
      .map(k => this.restaurants[k])
    );
  }

  constructor(options: object) {
    super(options);

    this.mapsEnabled = navigator.onLine;
    window.addEventListener('online', () => this.mapsEnabled = true);
    window.addEventListener('offline', () => this.mapsEnabled = false);

    if (!navigator.onLine) {
      this.currentRoute = 'restaurants-list';
    }
  }

  didInsertElement() {
    // Populate the nearby restaurants
    this.populateRestaurants();
  }

  async populateRestaurants(userLocation = this.userLocation, opts = {}) {
    // Extract the variables we need from the zamato query
    let {
      restaurants,
      results_shown,
      results_found,
      results_start,
    } = await getNearbyRestaurants(userLocation, opts);

    // Add all of the restaurants we found to the map
    restaurants = restaurants
      .reduce((acc, { restaurant }) => ({ ...acc, [restaurant.R.res_id]: restaurant }), {});

    this.restaurants = {
      ...this.restaurants,
      ...restaurants,
      ...getFavouritedRestaurants(),
    };

    // If there wehere more results than what we got
    // we will go fetch up to three more sets of
    // restaurants for the area we are in
    if ((results_shown < results_found) && (results_start < (results_shown * 3))) {
      this.populateRestaurants(this.userLocation, { results_start: (results_start + results_shown) });
    }
  }

  setRoute(route, restaurant = {}) {
    this.currentRoute = route;
    this.restaurant = restaurant;
  }

  toggleMaps() {
    this.mapsEnabled = navigator.onLine;
  }

  updateRestaurant(restaurant) {
    this.restaurant = restaurant;

    if (restaurant.favourited) {
      addFavourite(restaurant);
    } else {
      removeFavourite(restaurant);
    }

    this.restaurants = {
      ...this.restaurants,
      [restaurant.R.res_id]: restaurant,
    }
  }

  updateUserLocation(userLocation) {
    this.userLocation = { ...userLocation };
    this.populateRestaurants(userLocation);
  }
}
