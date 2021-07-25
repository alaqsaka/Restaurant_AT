/* eslint-disable no-useless-concat */
// import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <p class="restaurant__address">${restaurant.address}</p>

  <div class="restaurant__info">

    <div class="restaurant_photo">
        <img src="https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}" alt="Foto ${restaurant.name}" width="400" height="400">
    </div>
  
    <div class="restaurant_detailed_info">
        <p>Rating: ${restaurant.rating} </p>
        <p>Categories: ${restaurant.categories.map((category) => category.name).join(', ')} </p>
        <p>Food: </p>
        <p>${restaurant.menus.foods.map((food) => food.name).join(', ')} </p>
        <p>Drink: </p>
        <p>${restaurant.menus.drinks.map((drink) => drink.name).join(', ')} </p>
    </div>
    
  </div>
  
    <h2 class="customer_review_tag">Customer Reviews</h2>

  <div class="customer_reviews">
    ${restaurant.customerReviews.map((review) => `
    <div class="restaurantInfoList">
        <p>"${review.review}" - ${review.name}</p>
    
        <p class="date-review">${review.date}</p>
    </div>
    `).join('')}
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
        <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}" width="500" height="300">
        <div class="restaurant-item__header__rating">
            <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
        </div>
    </div>
    <div class="restaurant-item__content">
        <h3><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a></h3>
        <p class="location">Location: ${restaurant.city}</p>

        <p>Description:</p>
        <p class="description">${restaurant.description}</p>
    </div>
  </div>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
