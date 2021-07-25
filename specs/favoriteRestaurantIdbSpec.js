import { itActsAsFavoriteRestaurantModel } from "./contract/favoriteRestaurantContract";
import LikeRestaurantIdb from "../src/scripts/data/likedrestaurant-idb";

describe('Liked Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await LikeRestaurantIdb.getAllRestaurant()).forEach(async (restaurant) => {
            await LikeRestaurantIdb.deleteRestaurant(restaurant.id);
        });
    });

    itActsAsFavoriteRestaurantModel(LikeRestaurantIdb);
});