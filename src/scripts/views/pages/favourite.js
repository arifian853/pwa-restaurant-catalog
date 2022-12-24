/* eslint-disable space-before-function-paren */
import { createMovieItemTemplate } from '../templates/template-creator'
import FavoriteRestaurantIdb from '../../data/RestaurantFavouriteDB'

const FavouriteRestaurant = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favourite</h2>
        <div id="restaurants" class="restaurant">
        <div id="warning"> </div>
        </div>
      </div>
    `
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant()
    const restaurantContainer = document.querySelector('#restaurants')
    const emptyRestaurant = document.querySelector('#warning')
    if (restaurants.length === 0) {
      emptyRestaurant.innerHTML = `
      You Have No Favourite Restaurant
      `
    }
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createMovieItemTemplate(restaurant)
    })
  }
}
export default FavouriteRestaurant
