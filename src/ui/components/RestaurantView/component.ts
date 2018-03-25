import Component from '@glimmer/component';
import L from 'leaflet';

import { getMapInstance, renderMap, addRestaurantToMap } from '../../../utils/map/map';
import { setUserLocation } from '../../../utils/location/location';

export default class RestaurantView extends Component {
  map = {};

  get element(): HTMLElement {
    return this.bounds.firstNode as HTMLElement;
  }

  // Create and render the map
  didInsertElement () {
    const restaurant = this.args.restaurant;
    const { latitude, longitude } = restaurant.location;
    const ele = this.element.querySelector('#map');

    const map = getMapInstance(ele, latitude, longitude, { zoomControl: false });

    renderMap(map);
    addRestaurantToMap(map, restaurant, () => {});

    this.map = map;
  }
}
