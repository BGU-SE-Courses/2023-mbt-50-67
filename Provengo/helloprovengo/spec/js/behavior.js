/* @provengo summon selenium */

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
 * This story responsible for the setup of the tested use cases.
 * It adds an item to the store and registers a user.
 */
bthread('setup', function() {
  let s1 = new SeleniumSession('set user').start(registerURL)
  let s2 = new SeleniumSession('set admin').start(OpenCartAdminURL)
  request(Event('user registers'));
  request(Event('admin login'));
  request(Event('admin go to products page'));
  request(Event('admin add product'));
  request(Event('setup end'));
})

/**
 * This story responsible for the use case of user adding a product to wishlist.
 */
bthread('Add item to wishlist', function () {
  waitFor(Event('setup end'));
  //let s = new SeleniumSession('user').start(OpenCartURL)
  request(Event('user login'));
  request(Event('user search for product'));
  request(Event('user add product to wishlist'));
})

/**
 * This story responsible for the use case of admin deleting a product for the store
 */
bthread('Admin deletes an item', function () {
  waitFor(Event('setup end'));
  //let s = new SeleniumSession('admin').start(OpenCartAdminURL)
  request(Event('admin login'));
  request(Event('admin go to products page'));
  request(Event('admin delete product'));
})

/**
 * This story responsible to block the option to add an item to wishlist after an admin deleted the product.
 */
bthread('Block adding to wishlist after removing the item', function () {
  sync({waitFor: Event('admin delete product')});
  sync({block: Event('user add product to wishlist')});
})