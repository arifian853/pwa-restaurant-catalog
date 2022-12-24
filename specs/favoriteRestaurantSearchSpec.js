/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable no-undef */
import FavRestaurantSearchPresenter from '../src/scripts/views/pages/fav-movies/FavRestaurantSearchPresenter'
import FavoriteRestaurantIdb from '../src/scripts/data/RestaurantFavouriteDB'
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/fav-movies/FavRestaurantSearchView'

describe('Searching restaurants', () => {
  let presenter
  let favoriteRestaurant
  let view

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  const constructPresenter = () => {
    favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb)
    presenter = new FavRestaurantSearchPresenter({
      favoriteRestaurant,
      view
    })
  }

  beforeEach(() => {
    setRestaurantSearchContainer()
    constructPresenter()
  })

  describe('When query is not empty', () => { // DESCRIBE WHEN QUERY IS NOT EMPTY
    it('should be able to capture the query typed by the user', () => {
      searchRestaurant('Restoran a')
      expect(presenter.latestQuery).toEqual('Restoran a')
    })

    it('should ask the model to search for restaurant', () => {
      searchRestaurant('Restoran a')
      expect(favoriteRestaurant.searchRestaurant).toHaveBeenCalledWith('Restoran a')
    })

    it('should show the found restaurant', () => {
      presenter._showFoundRestaurant([{ id: 1 }])
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(1)

      presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }])
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2)
    })

    it('should show the title of the found restaurant', () => {
      presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }])
      expect(document.querySelectorAll('.restaurant-title').item(0).textContent)
        .toEqual('Satu')

      presenter._showFoundRestaurant(
        [{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]
      )

      const restaurantTitle = document.querySelectorAll('.restaurant-title')
      expect(restaurantTitle.item(0).textContent).toEqual('Satu')
      expect(restaurantTitle.item(1).textContent).toEqual('Dua')
    })

    it('should show - for found restaurant without title', () => {
      presenter._showFoundRestaurant([{ id: 1 }])
      expect(document.querySelectorAll('.restaurant-title').item(0).textContent)
        .toEqual('-')
    })

    it('should show the restaurant found by Favorite Restaurant', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        const restaurantTitle = document.querySelectorAll('.restaurant-title')
        expect(restaurantTitle.item(0).textContent).toEqual('restoran abc')
        expect(restaurantTitle.item(1).textContent).toEqual('ada juga restoran abcde')
        expect(restaurantTitle.item(2).textContent).toEqual('ini juga boleh restoran a')
        done()
      })

      favoriteRestaurant.searchRestaurant.withArgs('restoran a').and.returnValues([
        { id: 111, title: 'restoran abc' },
        { id: 222, title: 'ada juga restoran abcde' },
        { id: 333, title: 'ini juga boleh restoran a' }
      ])

      searchRestaurant('restoran a')
      // expect(document.querySelectorAll('.restaurant').length).toEqual(3)
    })
  })

  describe('When query is empty', () => { // DESCRIBE WHEN QUERY IS EMPTY
    it('should capture the query as empty', () => {
      searchRestaurant(' ')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestaurant('   ')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestaurant('')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestaurant('\t')
      expect(presenter.latestQuery.length).toEqual(0)
    })

    it('should show all favorite restaurant', () => {
      searchRestaurant('    ')
      expect(favoriteRestaurant.getAllRestaurant)
        .toHaveBeenCalled()
    })
  })

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.warning').length).toEqual(1)
          done()
        })

      favoriteRestaurant.searchRestaurant.withArgs('restoran a').and.returnValues([])

      searchRestaurant('restoran a')
    })

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(0)
        done()
      })
      favoriteRestaurant.searchRestaurant.withArgs('restoran a').and.returnValues([])
      searchRestaurant('restoran a')
    })
  })
})
