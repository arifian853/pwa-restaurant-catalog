/* eslint-disable space-before-function-paren */
import UrlParser from '../../routes/url-parser'
import RestaurantDBSource from '../../data/RestaurantDBSource'
import { createMovieDetailTemplate } from '../templates/template-creator'
import LikeButtonInitiator from '../../utils/like-button-initiator'
import FavoriteRestaurantIdb from '../../data/RestaurantFavouriteDB'

const DetailRestaurant = {
  async render() {
    return `
    <div id="restaurant" class="restaurant-detail-section">
    
    </div>
    <div id="likeButtonContainer"></div> 
    `
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const restaurant = await RestaurantDBSource.detailRestaurant(url.id)
    const restaurantContainer = document.querySelector('#restaurant')
    restaurantContainer.innerHTML = createMovieDetailTemplate(restaurant)

    console.log(restaurant)
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant
    })
  }
}
export default DetailRestaurant
