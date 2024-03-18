function composeQuery(session, data) {
  session.writeText(xpaths.searchWindow.searchInput, data.text)
}

function startSearch(session) {
  with(session) {
    click(xpaths.searchWindow.searchButton)
  }
}

function feelLucky(session) {
  with(session) {
    click(xpaths.searchWindow.feelingLuckyButton)
  }
}

function registerUser(session){
  with(session){
    writeText(xpath.registerWindow.firstNameInput, userFirstName)
    writeText(xpath.registerWindow.lastNameInput, userLastName)
    writeText(xpath.registerWindow.emailInput, userEmail)
    writeText(xpath.registerWindow.passwordInput, userPassword)
    click(xpaths.registerWindow.agreeCheckbox)
    click(xpaths.registerWindow.continueButton)
    close()
  }
}

function adminLogin(session){
  with(session){
    writeText(xpath.adminLoginWindow.usernameInput, adminUsername)
    writeText(xpath.adminLoginWindow.passwordInput, adminPassword)
    click(xpaths.adminLoginWindow.loginButton)
    Ctrl.doSleep(1000)
    click(classes.closeNotificationButton)
  }
}

function adminGoToProductsPage(session){
  with(session){
    click(xpath.adminMainWindow.catalogButton)
    click(xpath.adminMainWindow.productsButton)
  }
}

function adminAddProduct(session){
  with(session){
    click(xpath.adminProductListWindow.addProductButton)
    writeText(xpath.addProductWindow.productNameInput, productName)
    writeText(xpath.addProductWindow.tagInput, productTag)
    click(xpath.addProductWindow.dataTab)
    writeText(xpath.addProductWindow.modelInput, productModel)
    click(xpath.addProductWindow.seoTab)
    click(xpath.addProductWindow.seoInput)
    click(xpath.addProductWindow.saveButton)
    //wait(1000)
    click(classes.closeNotificationButton)
  }
}

function adminDeleteProduct(session){
  with(session){
    click(xpath.adminMainWindow.catalogButton)
    click(xpath.adminMainWindow.productsButton)
    writeText(xpath.adminProductListWindow.productNameInput, productName)
    click(xpath.adminProductListWindow.filterButton)
    //wait(1000)
    click(xpath.adminProductListWindow.selectProductButton)
    //wait(1000)
    click(xpath.adminProductListWindow.deleteProductButton)
    acceptAlert()
    //wait(1000)
    click(classes.closeNotificationButton)
  }
}

