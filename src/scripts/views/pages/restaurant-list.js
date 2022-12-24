import RestaurantDBSource from '../../data/RestaurantDBSource'
import { createMovieItemTemplate } from '../templates/template-creator'

const RestaurantList = {
  async render () {
    return `
    <div class="content">
    <div class="hero lazyload">
    <div class="filter">
      <div class="greeting">
        <h1>Temukan Restoran Terbaik !</h1>
        <p>Dengan informasi akurat dan lengkap serta terpercaya !</p>
      </div>
      <div class="discover">
        <a href="#mainContent"><button>Discover</button></a>
      </div>
    </div>
    </div>
        <h2 class="content__heading">Best Restaurants near you</h2>
        <br />
        <div id="restaurants" class="restaurant">
        </div>
      </div>
    `
  },

  async afterRender () {
    const restaurants = await RestaurantDBSource.restaurantList()
    const moviesContainer = document.querySelector('#restaurants')
    restaurants.forEach((restaurant) => {
      moviesContainer.innerHTML += createMovieItemTemplate(restaurant)
    })
  }
}
export default RestaurantList
