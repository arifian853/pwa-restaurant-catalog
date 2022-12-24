/* eslint-disable indent */
/* eslint-disable no-undef */

import FavoriteRestaurantSearchView from '../src/scripts/views/pages/fav-movies/FavRestaurantSearchView'
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/fav-movies/FavRestaurantShowPresenter'

describe('Showing all favorite restaurant', () => {
    let view

    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView()
        document.body.innerHTML = view.getFavoriteRestaurantTemplate()
    }

    beforeEach(() => {
        renderTemplate()
    })

    describe('When no restaurant have been liked', () => {
        it('should render the information that no restaurant have been liked', () => {
            const presenter = new FavoriteRestaurantShowPresenter({
                view
            })

            const restaurants = []
            presenter._displayRestaurants(restaurants)

            expect(document.querySelectorAll('.warning').length)
                .toEqual(1)
        })
    })
})
