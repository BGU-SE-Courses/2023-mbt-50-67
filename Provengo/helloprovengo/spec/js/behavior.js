/* @provengo summon selenium */
/* @provengo summon ctrl */

/**
 * This story opens a new browser window, goes to google.com, and searches for "Pizza".
 */
/**
bthread('Search', function () {
  let s = new SeleniumSession('search').start(URL)
  composeQuery(s, { text: 'Pizza' })
  startSearch(s)
}) */


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
  //request(Event('user registers'));
  //registerUser(s1)
  s1.registerUser()

  //request(Event('admin login'))
  //adminLogin(s2)
  s2.adminLogin()

  //request(Event('admin go to products page'));
  //adminGoToProductsPage(s2)
  s2.adminGoToProductsPage()

  //request(Event('admin add product'));
  //adminAddProduct(s2)
  s2.adminAddProduct()

  //s1.close()
  //s2.close()
  request(Event('setup end'));

})

/**
 * This story responsible for the use case of user adding a product to wishlist.
 */
bthread('Add item to wishlist', function () {
  waitFor(Event('setup end'));
  let s = new SeleniumSession('user').start(loginURL)
  //request(Event('user login'));
  //userLogin(s)
  s.userLogin()

  interrupt(Event('End(adminDeleteProduct)'), function () {
    //request(Event('user search for product'));
    //userSearchProduct(s)
    s.userSearchProduct()

    //request(Event('user add product to wishlist'));
    //userAddProductToWishlist(s)
    s.userAddProductToWishlist()
  })
})

/**
 * This story responsible for the use case of admin deleting a product for the store
 */
bthread('Admin deletes an item', function () {
  waitFor(Event('setup end'));
  let s = new SeleniumSession('admin').start(OpenCartAdminURL)
  //request(Event('admin login'));
  //adminLogin(s)
  s.adminLogin()

  //request(Event('admin go to products page'));
  //adminGoToProductsPage(s)
  s.adminGoToProductsPage()

  //request(Event('admin delete product'));
  //adminDeleteProduct(s)
  s.adminDeleteProduct()
})

/**
 * This story responsible to block the option to add an item to wishlist after an admin deleted the product.
 */
bthread('Block adding to wishlist after removing the item', function () {
  sync({waitFor: Event('End(adminDeleteProduct)')});
  sync({block: Event('Start(userAddProductToWishlist)')});
})

/*
bthread('delete product only after the user adds it to wishlist', function () {
  sync({
    waitFor: Event('user add product to wishlist'),
    block: Event('admin delete product')
  });
})
 */

/*
//CHECK THIS!
bthread('Mark critical events order', function() {

  const endOfActionES = EventSet("", e => e.name.startsWith("End("));

  let e = sync({ waitFor: endOfActionES });
  let criticalEvents = ["userSearchProduct", "userAddProductToWishlist", "adminDeleteProduct"];

  let criticalEventsOrder = [];

  while (e.name !== "End(adminDeleteProduct)") {
    criticalEvents.forEach(ce => {
      if (e.name.includes(ce)) {
        criticalEventsOrder.push(ce);
      }
    });
    e = sync ({waitFor: endOfActionES});
  }
  criticalEventsOrder.push("admin delete product");

  let ceo = criticalEventsOrder.join(" -> ");
  sync({request: Ctrl.markEvent(ceo)});


})
*/

