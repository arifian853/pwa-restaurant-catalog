import CONFIG from '../../globals/config'

const createMovieDetailTemplate = (restaurant) =>

  `


<div class="restaurant-detail">

<img class="restaurant-poster-detail" src="${CONFIG.BASE_IMAGE_URL.small + restaurant.pictureId}" alt="${restaurant.name} || ID : ${restaurant.id}">

<div class="restaurant-desc-detail">
  <h3>${restaurant.name}</h3>
  <hr>
  <p>⭐️${restaurant.rating}/5</p>
  <p>${restaurant.address} | Kota ${restaurant.city}</p>
  <hr>
  <p> Kategori : ${restaurant.categories.map((category) => category.name).join(' , ')} </p>
  <hr>
  <p>${restaurant.description}</p>
  <hr>
</div>

</div>

<div class="restaurant-detail"> 
  <div> 
  <h3> Menu makanan </h3>
  <ul> 
  ${restaurant.menus.foods.map((food) => food.name).join(' | ')}
  </ul>
  <div/>
  <br />

  <div> 
  <h3> Menu minuman </h3>
  <ul> 
  ${restaurant.menus.drinks.map((drink) => drink.name).join(' | ')}
  </ul>
  </div>
  <br />

  <hr />
  <h3> Customer Review </h3>
  
  <div> 
    ${restaurant.customerReviews.map((customerReview) => customerReview.review).join(' <br /> ')} 
  </div>    
   
  <hr />
  <li> Reviews by :  ${restaurant.customerReviews.map((customerReview) => customerReview.name).join(' , ')} </li> 
</div>


`

const createMovieItemTemplate = (restaurant) => `
<div class="restaurant-item">
  <img class="restaurant-poster" src="${CONFIG.BASE_IMAGE_URL.small + restaurant.pictureId}" alt="${restaurant.name} || ID : ${restaurant.id}">
  <div class="restaurant-desc">
    <h3 class="restaurant-title"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
    <hr>
    <p>⭐️${restaurant.rating}/5</p>
    <p>${restaurant.city}</p>
    <hr>
    <div class="desc-only"> 
    <p>${restaurant.description}</p>
    </div>
    <hr>
  </div">
</div>
`

const createLikeButtonTemplate = () => `
  <button aria-label="favourite this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`

const createLikedButtonTemplate = () => `
  <button aria-label="delete this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`

export { createMovieItemTemplate, createMovieDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate }
