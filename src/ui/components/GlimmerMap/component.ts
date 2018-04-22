import Component, { tracked } from '@glimmer/component';
import L from 'leaflet';

import { getMapInstance, renderMap, getNearbyRestaurants, addRestaurantToMap } from '../../../utils/map/map';
import { getUserLocation, setUserLocation } from '../../../utils/location/location';

export default class GlimmerMap extends Component {
  @tracked selectedRestaurant = {};
  @tracked existingMarkers = [];
  @tracked isLoading = false;
  map = null;

  get element(): HTMLElement {
    return this.bounds.firstNode as HTMLElement;
  }

  setSelected(r): Function {
    return () => this.selectedRestaurant = r;
  }

  removeSelected(r): void {
    this.selectedRestaurant = {};
  }

  // Create and render the map
  didInsertElement () {
    const map = getMapInstance(this.element.querySelector('#map')); renderMap(map);
    this.map = map;
    this.addMarkers();
  }

  didUpdate () {
    this.addMarkers();
  }

  async getUserLocation() {
    // set the loading icon going
    this.toggleLoading();

    try {
      // Get the users location and update the map
      const p: Position = await getUserLocation();
      setUserLocation(this.map, p.coords);
      this.args.updateUserLocation(p.coords);
    } catch (e) {}

    // Stop the loading icon
    this.toggleLoading();
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  addMarkers() {
    const map = this.map
    const r = this.args.restaurants;

    if (map) {
      Object.keys(r).forEach(k => {
        if(!this.existingMarkers.includes(k)) {
          addRestaurantToMap(map, r[k], this.setSelected(r[k]))
          this.existingMarkers.push(k);
        }
      });
    }
  }
}
