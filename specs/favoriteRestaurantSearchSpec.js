import FavoriteRestaurantSearchPresenter from "../src/scripts/views/pages/liked-movies/favorite-restaurant-search-presenter";
import LikeRestaurantIdb from './../src/scripts/data/likedrestaurant-idb'

describe('Searching restaurants', () => {
    let presenter;
    let likeRestaurants;

    const searchRestaurants = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = 'restaurant a';
        queryElement.dispatchEvent(new Event('change'));
    }

    const setRestaurantSearchContainer = () => {
        document.body.innerHTML = `
        <div id="restaurant-search-container">
            <input id="query" type="text">
            <div class="restaurant-result-container">
                <ul class="restaurants">
                </ul>
            </div>
        </div>
        `
    };

    const constructPresenter = () => {
        likeRestaurants = spyOnAllFunctions(LikeRestaurantIdb);
        presenter = new FavoriteRestaurantSearchPresenter({
            likeRestaurants,
        });
    };

    beforeEach(() => {
      setRestaurantSearchContainer();
      constructPresenter();
    });
   
    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurants('');
            expect(presenter.latestQuery.length)
              .toEqual(0);
          });
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchRestaurants('restaurant a');
    
            expect(presenter.latestQuery).toEqual('restaurant a');
        });
    
        it('should ask the model to search for liked restaurant', () => {
            searchRestaurants('restaurant a');
    
            expect(LikeRestaurantIdb.searchRestaurants)
                .toHaveBeenCalledWith('restaurant a');
          });
    
        it('should show the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: 1 }]);
            expect(document.querySelectorAll('.restaurant').length).toEqual(1);
    
            presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]);
    
            expect(document.querySelectorAll('.restaurant').length).toEqual(2);
        });
    
        it('should show the title of the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }]);
            expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
              .toEqual('Satu');
    
              presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]);
    
              const restaurantTitles = document.querySelectorAll('.restaurant__title');
              expect(restaurantTitles.item(0).textContent).toEqual('Satu');
              expect(restaurantTitles.item(1).textContent).toEqual('Dua');
          });
    
        it('should show - for found restaurant without title', () => {
            presenter._showFoundRestaurants([{ id: 1 }]);
           
            expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
              .toEqual('-');
          });
    
          it('should show the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('restaurant-search-container')
                .addEventListener('restaurants:searched:updated', () => {
                    expect(document.querySelectorAll('.restaurant').length).toEqual(3);
                    done();
                });
    
            LikeRestaurantIdb.searchRestaurants.withArgs('restaurant a').and.returnValues([
              { id: 111, title: 'restaurant abc' },
              { id: 222, title: 'ada juga restaurant abcde' },
              { id: 333, title: 'ini juga boleh restaurant a' },
            ]);
           
            searchRestaurants('restaurant a');
          });
    
          it('should show the name of the movies found by Favorite Restaurants', (done) => {
            document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
              const restaurantTitles = document.querySelectorAll('.restaurant__title');
              expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
              expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
              expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');
           
              done();
            });
           
            LikeRestaurantIdb.searchRestaurants.withArgs('restaurant a').and.returnValues([
              { id: 111, title: 'restaurant abc' },
              { id: 222, title: 'ada juga restaurant abcde' },
              { id: 333, title: 'ini juga boleh restaurant a' },
            ]);
           
            searchRestaurants('restaurant a');
          });
    });
    
  });