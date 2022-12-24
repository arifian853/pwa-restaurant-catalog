const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev/',
  BASE_IMAGE_URL: {
    small: 'https://restaurant-api.dicoding.dev/images/small/',
    medium: 'https://restaurant-api.dicoding.dev/images/medium/',
    large: 'https://restaurant-api.dicoding.dev/images/large/'
  },
  CACHE_NAME: new Date().toISOString(),
  DATABASE_NAME: 'restaurant-app-database',
  DATABASE_VERSION: 1,
  DATABASE_STORE_NAME: 'restaurants'
}

export default CONFIG
