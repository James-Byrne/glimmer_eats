import Component, { tracked } from '@glimmer/component';

export default class GlimmerEats extends Component {
  @tracked currentRoute = 'map'

  setRoute(route) {
    this.currentRoute = route;
  }
}
