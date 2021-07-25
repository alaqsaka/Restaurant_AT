import LikeButtonInitiator from "../../src/scripts/utils/like-button-initiator";
import LikeRestaurantIdb from "../../src/scripts/data/likedrestaurant-idb";

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
    await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector("#likeButtonContainer"),
        likeRestaurants: LikeRestaurantIdb,
        restaurant,
    });
};

export { createLikeButtonPresenterWithRestaurant };