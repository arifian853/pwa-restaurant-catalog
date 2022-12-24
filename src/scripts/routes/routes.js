import RestaurantList from '../views/pages/restaurant-list'
import FavouriteRestaurant from '../views/pages/favourite'
import DetailRestaurant from '../views/pages/detail-restaurant'

const routes = {
  '/': RestaurantList, // default page
  '/restaurant-list': RestaurantList,
  '/favourite': FavouriteRestaurant,
  '/detail/:id': DetailRestaurant
}

export default routes
