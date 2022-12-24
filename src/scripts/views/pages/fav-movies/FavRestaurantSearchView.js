/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
        <div id="restaurant-search-container">
          <input id="query" type="text">
          <div class="restaurant-result-container">
            <ul class="restaurants">
            </ul>
          </div>
        </div>
      `
    }

    getFavoriteRestaurantTemplate() {
        return `
          <div class="content">
            <h2 class="content__heading">Your Liked Restaurants</h2>
            <div id="restaurants" class="restaurant">
            </div>
          </div>
        `
    }

    showFavoriteRestaurant(restaurants) {
        document.getElementById('restaurants').innerHTML = '<div class="warning"></div>'
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value)
        })
    }

    showRestaurant(restaurants) {
        let html
        if (restaurants.length > 0) {
            html = restaurants.reduce(
                (carry, restaurant) => carry.concat(`
                <li class='restaurant-item'> 
                    <span class='restaurant-title'>${restaurant.title || '-'}</span>
                </li>`), ''
            )
        } else {
            html = '<div class="warning">Restaurant not found</div>'
        }
        document.querySelector('.restaurants').innerHTML = html
        document.getElementById('restaurant-search-container').dispatchEvent(new Event('restaurants:searched:updated'))
    }
}

export default FavoriteRestaurantSearchView
