/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const OpenCartURL = 'localhost/opencart';
const OpenCartAdminURL = 'localhost/opencart/admin';
const registerURL = 'localhost/opencart/index.php?route=account/register&language=en-gb';
const loginURL = 'localhost/opencart/index.php?route=account/login&language=en-gb';


const xpaths = {
  registerWindow: {
    firstNameInput: "//*[@id='input-firstname']",
    lastNameInput: "//*[@id='input-lastname']",
    emailInput: "//*[@id='input-email']",
    passwordInput: "//*[@id='input-password']",
    agreeCheckbox: "//*[@name='agree']",
    continueButton: "//*[@type='submit']"
  },
  loginWindow: {
    emailInput: "//*[@id='input-email']",
    passwordInput: "//*[@id='input-password']",
    loginButton: "//div[3]/button[1]"
  },
  adminLoginWindow: {
    usernameInput: "//*[@id='input-username']",
    passwordInput: "//*[@id='input-password']",
    loginButton: "//button[1]"
  },
  adminMainWindow: {
    catalogButton: "//nav[1]/ul[1]/li[2]/a[1]",
    productsButton: "//nav[1]/ul[1]/li[2]/ul[1]/li[2]/a[1]",
    userListButton: "//div[3]/div[1]/div[3]/a[1]",
    logoutButton: "//li[4]/a[1]/span[1]"
  },
  userWishlistWindow: {
    firstProduct: "//td[2]/a[1]"
  },
  userMainWindow: {
    wishlistButton: "//li[3]/a[1]/span[1]",
    searchInput: "//header[1]/div[1]/div[1]/div[2]/div[1]/input[1]",
    searchButton: "//header[1]/div[1]/div[1]/div[2]/div[1]/button[1]/i[1]",
    heartButton: "//*[@id='product-list']/div/div/div/form/div/button[2]",
    accountButton: "//div[1]/div[2]/ul[1]/li[2]/div[1]/a[1]",
    logoutButton: "//li[2]/div[1]/ul[1]/li[5]/a[1]"
  },
  addProductWindow: {
    productNameInput: "//div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
    tagInput: "//*[@id='input-meta-title-1']",
    dataTab: "//form[1]/ul[1]/li[2]/a[1]",
    modelInput: "//*[@id='input-model']",
    seoTab: "//form[1]/ul[1]/li[11]/a[1]",
    seoInput: "//div[2]/div[1]/div[1]/div[1]/button[1]",
    saveButton: "//div[2]/div[1]/div[1]/div[1]/button[1]"
  },
  userListWindow: {
    emailInput: "//*[@id='input-email']",
    filterButton: "//*[@id='button-filter']",
    selectUserButton: "//tbody[1]/tr[1]/td[1]/input[1]",
    deleteButton: "//button[2]"
  },
  adminProductListWindow: {
    productNameInput: "//*[@id='input-name']",
    filterButton: "//div[1]/div[1]/div[1]/div[2]/div[6]/button[1]",
    selectProductButton: "//tbody[1]/tr[1]/td[1]/input[1]",
    deleteProductButton: "//button[3]",
    addProductButton: "//div[1]/div[1]/div[1]/a[1]/i[1]"
  }

}

const classes = {
  closeNotificationButton: "btn-close"
}

const searchTerm = 'pizza'
const adminUsername = adminPassword = 'noder'
const userFirstName = 'lior'
const userLastName = 'yishay'
const userPassword = 'lior123'
const userEmail = 'lior@gmail.com'
const productName = productTag = productModel = productSEO = 'zloof'
