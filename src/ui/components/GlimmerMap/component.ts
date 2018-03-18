import Component, { tracked } from '@glimmer/component';
import L from 'leaflet';

import { getMapInstance, renderMap, getNearbyRestaurants, addRestaurantToMap } from '../../../utils/map/map';
import { getUserLocation, setUserLocation } from '../../../utils/location/location';

export default class GlimmerMap extends Component {
  @tracked selectedRestaurant = {};
  @tracked existingMarkers = [];
  map = {};

  @tracked('args')
  get markers() {
    const map = this.map
    const r = this.args.restaurants;

    Object.keys(r).forEach(k => {
      if(!this.existingMarkers.includes(k)) {
        addRestaurantToMap(map, r[k], this.setSelected(r[k]))
        this.existingMarkers.push(k);
      }
    });

    return '';
  }

  get element(): HTMLElement {
    return this.bounds.firstNode as HTMLElement;
  }

  setSelected(r) {
    return () => this.selectedRestaurant = r;
  }

  // Create and render the map
  async didInsertElement () {
    const map = getMapInstance(this.element.querySelector('#map'));
    renderMap(map);
    this.map = map;
  }

  //watchUserLocation () {
  //  const state = this.state;
  //  state.map.addEventListener('moveend', () => {
  //    const { lat, lng } = state.map.getCenter();
  //    populateNearby(state, {latitude: lat, longitude: lng});
  //  });
  //}
}
