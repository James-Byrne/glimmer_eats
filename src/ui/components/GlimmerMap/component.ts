import Component, { tracked } from '@glimmer/component';
import L from 'leaflet';

import { createMap, renderMap, populateNearby } from '../../../utils/map/map';
import { getUserLocation, setUserLocation } from '../../../utils/location/location';

export default class GlimmerMap extends Component {
  @tracked state: any = {
    map: {},
    longitude: -6.27,
    latitude: 53.35,
    maxZoom: 17,
    startingZoom: 14,
    restaurantList: [],
    restaurant: {},
    onSelect: restaurant => this.state = { ...this.state, restaurant }
  }

  @tracked('state')
  get selectedRestaurant() {
    return this.state.restaurant;
  }

  get element(): HTMLElement {
    return this.bounds.firstNode as HTMLElement;
  }

  didInsertElement () {
    const state = this.state;
    const element = this.element.querySelector('#map');

    createMap(state, element);
    renderMap(state);

    this.setup();
  }

  async setup () {
    try {
      const p: Position = await getUserLocation();
      setUserLocation(this.state, p.coords);
      populateNearby(this.state, p.coords);
      this.watchUserLocation();
    } catch (e) {
      console.log('error ', e);
      // Couldn't get the users current location
    }
  }

  watchUserLocation () {
    const state = this.state;
    state.map.addEventListener('moveend', () => {
      const { lat, lng } = state.map.getCenter();
      populateNearby(state, {latitude: lat, longitude: lng});
    });
  }
}
