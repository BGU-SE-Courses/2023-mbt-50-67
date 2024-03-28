
function composeQuery(session, data) {
  session.writeText(xpaths.searchWindow.searchInput, data.text)
}

function startSearch(session) {
  with(session) {
    click(xpaths.searchWindow.searchButton)
  }
}
/*
const AnyStartInSession = function(s) {
  //if(s!=null) throw new Error("error1");
  return EventSet(
      `AnyStartInSession-${s}`,
      e => e.data && 'startEvent' in e.data && e.data.startEvent && s.name === e.data.session.name
  )
}

defineAction = function(name, func) {
  SeleniumSession.prototype[name] = function (session, data) {
    session = this

    sync({ request: Event(`Start(${name})`,
                  { session: session, startEvent: true, parameters: data }) })

    block(AnyStartInSession(session), function () {
        func(session, data)

        sync({ request: Event('End(${name})',
                { session: session, endEvent: true, parameters: data }) })
    })
  }
}*/

// Define an event filter for start events in a session
const AnyStartInSession = function (s) {
  return bp.EventSet("AnyStartInSession-" + s, function (e) {
    return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && String(s).equals(e.data.session.name)
  })
}

defineAction = function (name, func) {
  // Add the new action to the SeleniumSession prototype
  SeleniumSession.prototype[name] = function (data) {
    let session = this;

    // Request a start event
    sync({ request: bp.Event(`Start(${name})`, { session: session, startEvent: true, parameters: data }) })

    // Block any other start events in the session while the function is executing
    block(AnyStartInSession(this.name), function () {
      // Execute the function
      func(session, data)

      // Request an end event
      sync({ request: bp.Event(`End(${name})`, { session: session, endEvent: true, parameters: data }) })
    })
  }
}


defineAction('registerUser', function (session){
  session.writeText(xpaths.registerWindow.firstNameInput, userFirstName)
  session.writeText(xpaths.registerWindow.lastNameInput, userLastName)
  session.writeText(xpaths.registerWindow.emailInput, userEmail)
  session.writeText(xpaths.registerWindow.passwordInput, userPassword)
  session.click(xpaths.registerWindow.agreeCheckbox)
  session.click(xpaths.registerWindow.continueButton)
  session.close()
    //close()

})



/*
function registerUser(session){
  //sync({ request: Event('Start(registerUser)', { startEvent: true, session: session }) })
  //block(AnyStartInSession(session), function () {
    with(session){
      writeText(xpaths.registerWindow.firstNameInput, userFirstName)
      writeText(xpaths.registerWindow.lastNameInput, userLastName)
      writeText(xpaths.registerWindow.emailInput, userEmail)
      writeText(xpaths.registerWindow.passwordInput, userPassword)
      click(xpaths.registerWindow.agreeCheckbox)
      click(xpaths.registerWindow.continueButton)
      //sync({ request: Event('End(registerUser)', { endEvent: true, session: session }) })
      //close()
    }

  //})
}*/


defineAction('adminLogin', function (session) {
  with(session){
    writeText(xpaths.adminLoginWindow.usernameInput, adminUsername)
    writeText(xpaths.adminLoginWindow.passwordInput, adminPassword)
    waitForClickability(xpaths.adminLoginWindow.loginButton)
    click(xpaths.adminLoginWindow.loginButton)
    waitForVisibility(xpaths.notification.closeNotificationButton)
    click(xpaths.notification.closeNotificationButton)
  }
})
/*
function adminLogin(session){
  with(session){
    writeText(xpaths.adminLoginWindow.usernameInput, adminUsername)
    writeText(xpaths.adminLoginWindow.passwordInput, adminPassword)
    waitForClickability(xpaths.adminLoginWindow.loginButton)
    click(xpaths.adminLoginWindow.loginButton)
    waitForVisibility(xpaths.notification.closeNotificationButton)
    click(xpaths.notification.closeNotificationButton)
  }
}*/

defineAction('adminGoToProductsPage', function (session) {
  with(session){
    click(xpaths.adminMainWindow.sidebarButton)
    click(xpaths.adminMainWindow.catalogButton)
    click(xpaths.adminMainWindow.productsButton)
  }
})
/*
function adminGoToProductsPage(session){
  with(session){
    click(xpaths.adminMainWindow.sidebarButton)
    click(xpaths.adminMainWindow.catalogButton)
    click(xpaths.adminMainWindow.productsButton)
  }
}*/

defineAction('adminAddProduct', function (session) {
  with(session){
    click(xpaths.adminProductListWindow.addProductButton)
    writeText(xpaths.addProductWindow.productNameInput, productName)
    writeText(xpaths.addProductWindow.tagInput, productTag)
    click(xpaths.addProductWindow.dataTab)
    writeText(xpaths.addProductWindow.modelInput, productModel)
    click(xpaths.addProductWindow.seoTab)
    writeText(xpaths.addProductWindow.seoInput, productSEO)
    click(xpaths.addProductWindow.saveButton)

    //waitForVisibility(xpaths.notification.closeNotificationButton)
    //click(xpaths.notification.closeNotificationButton)
    close()
  }
})
/*
function adminAddProduct(session){
  with(session){
    click(xpaths.adminProductListWindow.addProductButton)
    writeText(xpaths.addProductWindow.productNameInput, productName)
    writeText(xpaths.addProductWindow.tagInput, productTag)
    click(xpaths.addProductWindow.dataTab)
    writeText(xpaths.addProductWindow.modelInput, productModel)
    click(xpaths.addProductWindow.seoTab)
    writeText(xpaths.addProductWindow.seoInput, productSEO)
    click(xpaths.addProductWindow.saveButton)

    //waitForVisibility(xpaths.notification.closeNotificationButton)
    //click(xpaths.notification.closeNotificationButton)
  }
}*/

defineAction('adminDeleteProduct', function (session) {
  with(session){
    click(xpaths.adminProductListWindow.openFilterButton)
    writeText(xpaths.adminProductListWindow.productNameInput, productName)
    click(xpaths.adminProductListWindow.filterButton)
    waitForClickability(xpaths.adminProductListWindow.selectProductButton)
    click(xpaths.adminProductListWindow.selectProductButton)
    waitForClickability(xpaths.adminProductListWindow.deleteProductButton)
    sync({ request: bp.Event('aboutToDeleteProduct') })
    click(xpaths.adminProductListWindow.deleteProductButton)
    acceptAlert()
    //waitForVisibility(xpaths.notification.closeNotificationButton)
    //click(xpaths.notification.closeNotificationButton)
  }
})
/*
function adminDeleteProduct(session){
  with(session){
    click(xpaths.adminProductListWindow.openFilterButton)
    writeText(xpaths.adminProductListWindow.productNameInput, productName)
    click(xpaths.adminProductListWindow.filterButton)
    waitForClickability(xpaths.adminProductListWindow.selectProductButton)
    click(xpaths.adminProductListWindow.selectProductButton)
    waitForClickability(xpaths.adminProductListWindow.deleteProductButton)
    click(xpaths.adminProductListWindow.deleteProductButton)
    acceptAlert()
    //waitForVisibility(xpaths.notification.closeNotificationButton)
    //click(xpaths.notification.closeNotificationButton)
  }
}*/


defineAction('adminLogout', function (session) {
  with(session){
    click(xpaths.adminMainWindow.logoutButton)
  }
})


/*
function adminLogout(session){
  with(session){
    click(xpaths.adminMainWindow.logoutButton)
  }
}*/


defineAction('userLogin', function (session) {
  with(session){
    writeText(xpaths.loginWindow.emailInput, userEmail)
    writeText(xpaths.loginWindow.passwordInput, userPassword)
    click(xpaths.loginWindow.loginButton)
  }
})
/*
function userLogin(session){
  with(session){
    writeText(xpaths.loginWindow.emailInput, userEmail)
    writeText(xpaths.loginWindow.passwordInput, userPassword)
    click(xpaths.loginWindow.loginButton)
  }
}*/

defineAction('userSearchProduct', function (session) {
  with(session){
    writeText(xpaths.userMainWindow.searchInput, productName)
    click(xpaths.userMainWindow.searchButton)
    //wait(1000))
  }
})
/*
function userSearchProduct(session){
  with(session){
    writeText(xpaths.userMainWindow.searchInput, productName)
    click(xpaths.userMainWindow.searchButton)
    //wait(1000))
  }
}*/

defineAction('userAddProductToWishlist', function (session) {
  with(session){
    moveToElement(xpaths.userMainWindow.heartButton)
    waitForClickability(xpaths.userMainWindow.heartButton)
    click(xpaths.userMainWindow.heartButton)
  }
})

/*
function userAddProductToWishlist(session){
  with(session){
    //scroll down
    //wait(1000)
    moveToElement(xpaths.userMainWindow.heartButton)
    waitForClickability(xpaths.userMainWindow.heartButton)
    click(xpaths.userMainWindow.heartButton)
    //wait(1000)
  }
}
*/









