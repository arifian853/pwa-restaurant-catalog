/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable eqeqeq */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import { itActsAsFavoriteRestaurantModel } from './contract/favouriteRestaurantContract'

let favoriteRestaurant = []

const FavoriteRestaurantArray = {
    getRestaurant(id) {
        if (!id) {
            return
        }

        return favoriteRestaurant.find((restaurant) => restaurant.id == id)
    },

    getAllRestaurant() {
        return favoriteRestaurant
    },

    putRestaurant(restaurant) {
        if (!restaurant.hasOwnProperty('id')) {
            return
        }

        // pastikan id ini belum ada dalam daftar favouriteRestaurant
        if (this.getRestaurant(restaurant.id)) {
            return
        }

        favoriteRestaurant.push(restaurant)
    },

    deleteRestaurant(id) {
        favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id != id)
    },
    async searchRestaurant(query) {
        return (await this.getAllRestaurant()).filter((restaurant) => {
            const loweredCaseRestaurantTitle = (restaurant.title || '-').toLowerCase()
            const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '')

            const loweredCaseQuery = query.toLowerCase()
            const jammedQuery = loweredCaseQuery.replace(/\s/g, '')

            return jammedRestaurantTitle.indexOf(jammedQuery) !== -1
        })
    }

}

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteRestaurant = [])

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray)
})
