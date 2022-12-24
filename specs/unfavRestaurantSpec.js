/* eslint-disable indent */
/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/RestaurantFavouriteDB'
import * as TestFactories from './helpers/testFactories'

describe('Unliking A Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>'
    }

    beforeEach(async () => {
        addLikeButtonContainer()
        await FavoriteRestaurantIdb.putRestaurant({ id: 1 })
    })

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(1)
    })

    it('should display unlike widget when the restaurant has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
        expect(document.querySelector('[aria-label="delete this restaurant"]')).toBeTruthy()
    })

    it('should not display like widget when the movie has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
        expect(document.querySelector('[aria-label="favourite this restaurant"]')).toBeFalsy()
    })

    it('should be able to remove liked restaurant from the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
        document.querySelector('[aria-label="delete this restaurant"]').dispatchEvent(new Event('click'))
        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([])
    })

    it('should not throw error if the unliked restaurant is not in the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
        await FavoriteRestaurantIdb.deleteRestaurant(1)
        document.querySelector('[aria-label="delete this restaurant"]').dispatchEvent(new Event('click'))
        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([])
    })
})
