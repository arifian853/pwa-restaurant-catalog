/* eslint-disable indent */
/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contract/favouriteRestaurantContract'
import FavoriteRestaurantIdb from '../src/scripts/data/RestaurantFavouriteDB'

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await FavoriteRestaurantIdb.getAllRestaurant()).forEach(async (restaurant) => {
            await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id)
        })
    })

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb)
})
