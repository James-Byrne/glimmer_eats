export function addFavourite(restaurant: any): void {
  localStorage.setItem(favouritesName(), JSON.stringify({
    ...getFavouritedRestaurants(),
    [restaurant.R.res_id]: restaurant,
  }));
}

export function removeFavourite(restaurant): void {
  const favourited = JSON.parse(localStorage.getItem(favouritesName()));
  delete favourited[restaurant.R.res_id];
  localStorage.setItem(favouritesName(), JSON.stringify(favourited));
}

export function getFavouritedRestaurants(): object {
  return JSON.parse(localStorage.getItem(favouritesName()));
}

function favouritesName(): string {
  return 'favouritedRestaurants';
}
