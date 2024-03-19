
function composeQuery(session, data) {
  session.writeText(xpaths.searchWindow.searchInput, data.text)
}

function startSearch(session) {
  with(session) {
    click(xpaths.searchWindow.searchButton)
  }
}

const AnyStartInSession = function(s) {
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
}
/*
defineAction('registerUser', function (session){
  with(session){
    writeText(xpaths.registerWindow.firstNameInput, userFirstName)
    writeText(xpaths.registerWindow.lastNameInput, userLastName)
    writeText(xpaths.registerWindow.emailInput, userEmail)
    writeText(xpaths.registerWindow.passwordInput, userPassword)
    click(xpaths.registerWindow.agreeCheckbox)
    click(xpaths.registerWindow.continueButton)
    //close()
  }
})*/

function registerUser(session){
  sync({ request: Event('Start(registerUser)', { startEvent: true, session: session }) })
  block(AnyStartInSession(session), function () {
    with(session){
      writeText(xpaths.registerWindow.firstNameInput, userFirstName)
      writeText(xpaths.registerWindow.lastNameInput, userLastName)
      writeText(xpaths.registerWindow.emailInput, userEmail)
      writeText(xpaths.registerWindow.passwordInput, userPassword)
      click(xpaths.registerWindow.agreeCheckbox)
      click(xpaths.registerWindow.continueButton)
      //close()
    }

    sync({ request: Event('End(login)', { endEvent: true, session: session }) })
  })
}

function adminLogin(session){
  with(session){
    writeText(xpaths.adminLoginWindow.usernameInput, adminUsername)
    writeText(xpaths.adminLoginWindow.passwordInput, adminPassword)
    waitForClickability(xpaths.adminLoginWindow.loginButton)
    click(xpaths.adminLoginWindow.loginButton)
    waitForVisibility(xpaths.notification.closeNotificationButton)
    click(xpaths.notification.closeNotificationButton)
  }
}

function adminGoToProductsPage(session){
  with(session){
    click(xpaths.adminMainWindow.catalogButton)
    click(xpaths.adminMainWindow.productsButton)
  }
}

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
}

function adminDeleteProduct(session){
  with(session){
    click(xpaths.adminMainWindow.catalogButton)
    click(xpaths.adminMainWindow.productsButton)
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
}

function adminLogout(session){
  with(session){
    click(xpaths.adminMainWindow.logoutButton)
  }
}

function userLogin(session){
  with(session){
    writeText(xpaths.loginWindow.emailInput, userEmail)
    writeText(xpaths.loginWindow.passwordInput, userPassword)
    click(xpaths.loginWindow.loginButton)
  }
}
function userSearchProduct(session){
  with(session){
    writeText(xpaths.userMainWindow.searchInput, productName)
    click(xpaths.userMainWindow.searchButton)
    //wait(1000))
  }
}

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







