/* eslint-disable indent */
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator'
import FavoriteRestaurantIdb from '../../src/scripts/data/RestaurantFavouriteDB'

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
    await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurant: FavoriteRestaurantIdb,
        restaurant
    })
}

export { createLikeButtonPresenterWithRestaurant }
