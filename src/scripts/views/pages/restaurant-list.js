/* eslint-disable space-before-function-paren */
import RestaurantDBSource from '../../data/RestaurantDBSource'
import { createMovieItemTemplate } from '../templates/template-creator'

const RestaurantList = {
  async render() {
    return `
    <div class="content">
        <h2 class="content__heading" id="main">Best Restaurants near you</h2>
        <br />
        <div id="restaurants" class="restaurant">
        
        </div>
        
      </div>
    `
  },

  async afterRender() {
    const restaurants = await RestaurantDBSource.restaurantList()
    const moviesContainer = document.querySelector('#restaurants')
    restaurants.forEach((restaurant) => {
      moviesContainer.innerHTML += createMovieItemTemplate(restaurant)
    })
  }
}
export default RestaurantList
