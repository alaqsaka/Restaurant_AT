/* eslint-disable no-console */
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <div class="content">
            <h2 id="catalogue" class="content__heading">Best Restaurant In Your Area</h2>
            <div id="restaurants" class="restaurants">

            </div>
        </div>
        `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.Home();
    const restaurantContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
