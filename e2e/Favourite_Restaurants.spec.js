/* eslint-disable indent */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-undef */

const assert = require('assert')

Feature('Favourite Restaurants')

Before(({ I }) => {
    I.amOnPage('/#/favourite')
})

Scenario('liking fav restaurant', async ({ I }) => {
    I.see('You Have No Favourite Restaurant', '#warning')

    I.amOnPage('/')

    I.waitForElement('.restaurant-title a', 5)
    I.seeElement('.restaurant-title a')

    const firstRestaurant = locate('.restaurant-title a').first()
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant)
    I.click(firstRestaurant)

    I.waitForElement('#likeButton', 5)
    I.seeElement('#likeButton')
    I.click('#likeButton')

    I.amOnPage('/#/favourite')
    I.waitForElement('.restaurant-item', 5)
    I.seeElement('.restaurant-item')
    const likedRestaurantTitle = await I.grabTextFrom('.restaurant-title')

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle)
})

// Feature('un-Favourite Restaurants')

Scenario('unliking fav restaurant', async ({ I }) => {
    I.see('You Have No Favourite Restaurant', '#warning')

    I.amOnPage('/')

    I.waitForElement('.restaurant-title a', 5)
    I.seeElement('.restaurant-title a')

    const firstRestaurant = locate('.restaurant-title a').first()
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant)
    I.click(firstRestaurant)

    I.waitForElement('#likeButton', 5)
    I.seeElement('#likeButton')
    I.click('#likeButton')

    I.amOnPage('/#/favourite')
    I.waitForElement('.restaurant-item', 5)
    I.seeElement('.restaurant-item')
    const likedRestaurantTitle = await I.grabTextFrom('.restaurant-title')

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle)

    I.click(likedRestaurantTitle)

    I.waitForElement('#likeButton', 5)
    I.seeElement('#likeButton')
    I.click('#likeButton')

    I.amOnPage('/#/favourite')
    I.seeElement('#warning')

    const empty = await I.grabTextFrom('#warning')

    assert.strictEqual(empty, 'You Have No Favourite Restaurant')
})
