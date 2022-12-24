/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
class FavRestaurantSearchPresenter {
    constructor({ favoriteRestaurant, view }) {
        this._view = view
        this._listenToSearchRequestByUser()
        this._favoriteRestaurant = favoriteRestaurant
    }

    _listenToSearchRequestByUser() {
        this._view.runWhenUserIsSearching((latestQuery) => {
            this._searchRestaurant(latestQuery)
        })
    }

    async _searchRestaurant(latestQuery) {
        this._latestQuery = latestQuery.trim()

        let foundRestaurant
        if (this.latestQuery.length > 0) {
            foundRestaurant = await this._favoriteRestaurant.searchRestaurant(this.latestQuery)
        } else {
            foundRestaurant = await this._favoriteRestaurant.getAllRestaurant()
        }

        this._showFoundRestaurant(foundRestaurant)
    }

    _showFoundRestaurant(restaurants) {
        this._view.showRestaurant(restaurants)
    }

    get latestQuery() {
        return this._latestQuery
    }
}

export default FavRestaurantSearchPresenter
