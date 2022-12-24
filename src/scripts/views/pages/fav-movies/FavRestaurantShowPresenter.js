/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
class FavoriteRestaurantShowPresenter {
    constructor({ view }) {
        this._view = view
    }

    _displayRestaurants(restaurants) {
        this._view.showFavoriteRestaurant(restaurants)
    }
}

export default FavoriteRestaurantShowPresenter
