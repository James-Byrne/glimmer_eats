import Component, { tracked } from '@glimmer/component';
import { Coordinates } from '../../../utils/types';
import { getNearbyRestaurants, addRestaurantToMap } from '../../../utils/map/map';
import { getUserLocation, setUserLocation } from '../../../utils/location/location';

export default class GlimmerEats extends Component {
  // The current route
  @tracked currentRoute: string = 'map';
  @tracked restaurants: any = {};
  @tracked restaurant: any = {}; // TODO : add a restaurant interface
  @tracked userLocation: Coordinates = {
    longitude: -6.27,
    latitude: 53.35,
  };

  setRoute(route, restaurant = {}) {
    this.currentRoute = route;
    this.restaurant = restaurant;
  }

  async didInsertElement() {
    // Get the users location and update the map
    // TODO: add a loading icon here
    // const p: Position = await getUserLocation();

    // TODO: set the userLocation above and pass it to the
    // GlimmerMap param
    //setUserLocation(map, p.coords);

    // Populate the nearby restaurants
    const nearbyRestaurants = await getNearbyRestaurants(this.userLocation);

    nearbyRestaurants.forEach(({ restaurant }) =>  {
      this.restaurants = {
        ...this.restaurants,
        [restaurant.R.res_id]: restaurant
      }
    });
  }

  @tracked('restaurants')
  get favouriteRestaurants() {
    return (
      Object
      .keys(this.restaurants)
      .filter(k => this.restaurants[k]['favourited'])
      .map(k => this.restaurants[k])
    );
  }

  updateRestaurant(restaurant) {
    this.restaurant = restaurant;
    this.restaurants = {
      ...this.restaurants,
      [restaurant.R.res_id]: restaurant,
    }
  }
}
