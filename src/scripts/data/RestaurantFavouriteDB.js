/* eslint-disable space-before-function-paren */
import { openDB } from 'idb'
import CONFIG from '../globals/config'

const { DATABASE_NAME, DATABASE_VERSION, DATABASE_STORE_NAME } = CONFIG

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(DATABASE_STORE_NAME, { keyPath: 'id' })
  }
})

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) {
      return
    }
    return (await dbPromise).get(DATABASE_STORE_NAME, id)
  },
  async getAllRestaurant() {
    return (await dbPromise).getAll(DATABASE_STORE_NAME)
  },
  async putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return
    }
    return (await dbPromise).put(DATABASE_STORE_NAME, restaurant)
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(DATABASE_STORE_NAME, id)
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

export default FavoriteRestaurantIdb
