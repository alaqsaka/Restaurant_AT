import LikeRestaurantIdb from '../../data/likedrestaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
    <div class="content">
            <h2 class="content__heading">Liked Restaurants</h2>
            <div id="restaurants" class="restaurants">

            </div>
        </div>
    `;
  },

  async afterRender() {
    const restaurants = await LikeRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Like;
