/* @provengo summon selenium */
/* @provengo summon ctrl */
/* @provengo summon constraints */

/**
 * This story responsible for the setup of the tested use cases.
 * It adds an item to the store and registers a user.
 */
bthread('setup', function() {
  //let s1 = new SeleniumSession('set user').start(registerURL)
  let s2 = new SeleniumSession('setup admin').start(OpenCartAdminURL)
  //request(Event('user registers'));
  //registerUser(s1)
  //s1.registerUser()

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
  //request(Event('user search for product'));
  //userSearchProduct(s)
  s.userSearchProduct()
  interrupt(any('aboutToDeleteProduct'), function () {

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
  sync({waitFor: any('aboutToDeleteProduct')});
  sync({block: any('Start(userAddProductToWishlist)')});
})



bthread('domain specific marking', function() {

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
  criticalEventsOrder.push("adminDeleteProduct");

  let ceo = criticalEventsOrder.join(" -> ");
  sync({request: Ctrl.markEvent(ceo)});


})



bthread('two way marking', function() {
  //gives us a list of all the events
  waitFor(Event('setup end'));

  const eventSet = EventSet("", e => true);
  let e = sync({ waitFor: eventSet });
  let prevEvent = e

  let adminDeleteProduct_flag = false;
  let userSearchProduct_flag = false;
  while (!adminDeleteProduct_flag || !userSearchProduct_flag) {
    e = sync({waitFor: eventSet});

    if (e.name === 'End(adminDeleteProduct)')
      adminDeleteProduct_flag = true;

    if (e.name === 'End(userSearchProduct)')
      userSearchProduct_flag = true;

    //we have 2 types of events: selenium actions and our events like 'Start(adminDeleteProduct)'
    //each one saves the session name differently
    let e_session = e.session ? e.session : e.data.session.name;
    let prev_session = prevEvent.session ? prevEvent.session : prevEvent.data.session.name;

    //different sessions
    if(e_session !== prev_session){
      sync({request: Ctrl.markEvent(prevEvent.name + ',' + e.name)});
    }

    //update the prev event to the current event
    prevEvent = e;
  }

})

//note: if the product is deleted before the user adds it to the wishlist, it won't list all the events
bthread('listing all the admin and user events', function() {
  eventLists = {
    admin: [],
    user: [],
    undefined: [] //fixme
  }
  waitFor(Event('setup end'));

  const eventSet = EventSet("", e => true);
  let e = sync({ waitFor: eventSet });

  let adminDeleteProduct_flag = false;
  let userSearchProduct_flag = false;
  while (!adminDeleteProduct_flag || !userSearchProduct_flag) {
    if (e.name === 'End(adminDeleteProduct)')
      adminDeleteProduct_flag = true;

    if (e.name === 'End(userSearchProduct)')
      userSearchProduct_flag = true;

    //we have 2 types of events: selenium actions and our events like 'Start(adminDeleteProduct)'
    //each one saves the session name differently
    //fixme: for some reason it may happen that the e.session and the e.data.session are both undefined. but it's not the case for the bthread above...
    let e_session = e.session ? e.session : e.data.session ? e.data.session.name : undefined;

    if(e_session === 'admin')
      eventLists.admin.push(e.name);
    if(e_session === 'user')
      eventLists.user.push(e.name);
    else
      eventLists.undefined.push(e.name); //fixme

    e = sync ({waitFor: eventSet});
  }

  sync({request: Ctrl.markEvent('[admin]\t' + eventLists.admin.join(', '))});
  sync({request: Ctrl.markEvent('[user]\t' + eventLists.user.join(', '))});
  sync({request: Ctrl.markEvent('[undefined]\t' + eventLists.undefined.join(', '))}); //fixme

  //note: wanted to write the events to a json file, but it's not possible to use 'require' in provengo for some reason



})











