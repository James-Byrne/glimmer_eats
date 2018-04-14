import Component, {tracked } from '@glimmer/component';
import L from 'leaflet';

import { getMapInstance, renderMap, addRestaurantToMap } from '../../../utils/map/map';
import { setUserLocation } from '../../../utils/location/location';

export default class RestaurantView extends Component {
  map = {};
  warningText = 'Warning this will bring you to another site from which you can never return!!! But there will also be useful information and whatever ...';

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

  @tracked('args')
  get isFavourited() {
    return this.args.restaurant.favourited;
  }

  toggleFavouriteRestaurant() {
    this.args.updateRestaurant({
      ...this.args.restaurant,
      favourited: !this.args.restaurant.favourited,
    });
  }

  openMenu(restaurant) {
    if (confirm(this.warningText)) {
      window.location = restaurant.menu_url;
    }
  }
}
