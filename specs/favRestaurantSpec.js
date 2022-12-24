/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/RestaurantFavouriteDB'
import * as TestFactories from './helpers/testFactories'

describe('Memfavoritkan Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>'
  }

  beforeEach(() => {
    addLikeButtonContainer()
  })

  it('should show the fav button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
    expect(document.querySelector('[aria-label="favourite this restaurant"]')).toBeTruthy()
  })

  it('should show the unfav button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
    expect(document.querySelector('[aria-label="delete this restaurant"]')).toBeFalsy()
  })

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1)

    expect(restaurant).toEqual({ id: 1 })
    FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 })
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([{ id: 1 }])
    FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({})
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([])
  })
})
