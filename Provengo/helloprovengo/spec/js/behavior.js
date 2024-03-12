/* @provengo summon selenium */
/* @provengo summon constraints */

/**
 * This story opens a new browser window, goes to google.com, and searches for "Pizza".
 */
/**
bthread('Search', function () {
  let s = new SeleniumSession('search').start(URL)
  composeQuery(s, { text: 'Pizza' })
  startSearch(s)
})
    */

/**
 * This story opens a new browser window, goes to google.com, and searches for "Pasta" using the "I Feel Lucky" feature.
 */

/**
bthread('Feeling lucky', function () {
  let s = new SeleniumSession('lucky').start(URL)
  composeQuery(s, { text: 'Pasta' })
  feelLucky(s)
})
 */

/**
 * This story Adds an item to a user's wishlist
 */

const delItem = Event('admin delete product');
const addToWishList = Event('user add product to wishlist');

Constraints.after(delItem).block(addToWishList).forever();

bthread('setup', function() {
  //let s = new SeleniumSession('set').start(OpenCartURL)
  request(Event('user registers'));
  request(Event('admin login'));
  request(Event('admin go to products page'));
  request(Event('admin add product'));
  request(Event('setup end'));
})

bthread('Add item to wishlist', function () {
  waitFor(Event('setup end'));
  //let s = new SeleniumSession('user').start(OpenCartURL)
  request(Event('user login'));
  request(Event('user search for product'));
  request(Event('user add product to wishlist'));
})


bthread('Admin deletes an item', function () {
  waitFor(Event('setup end'));
  //let s = new SeleniumSession('admin').start(OpenCartAdminURL)
  request(Event('admin login'));
  request(Event('admin go to products page'));
  request(Event('admin delete product'));
})