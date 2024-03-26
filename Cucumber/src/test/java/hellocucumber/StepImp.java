package hellocucumber;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.awt.*;
import java.time.Duration;

public class StepImp {

    private WebDriver driver;

    private JavascriptExecutor jse;
    private WebDriverWait wait;

    private final String user1_firstName = "lior";
    private final String user1_lastName = "yishay";
    private final String user1_email = "lior@gmail.com";
    private final String user1_password = "lior123";
    private final String product1_name = "zloof";
    private final String product1_tag = "zloof";
    private final String product1_model = "zloof";
    private final String product1_SEO = "zloof";
    private final String admin_username = "noder";
    private final String admin_password = "noder";

    public StepImp() {
        // Set the path of the ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", "..\\Selenium\\chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("start-maximized");

        // Create an instance of ChromeDriver and WebDriverWait
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // 10 seconds wait
    }

    public StepImp(String driverPath){
        // Set the path of the ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", driverPath);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("start-maximized");

        // Create an instance of ChromeDriver and WebDriverWait
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // 10 seconds wait
    }

    public void navigateToRegisterPage(){
        driver.get("http://localhost/opencart/index.php?route=account/register&language=en-gb");
    }

    public void registerUser(String firstName, String lastName, String email, String password){
        navigateToRegisterPage();
        WebElement firstNameElement = driver.findElement(By.xpath("//*[@id='input-firstname']"));
        firstNameElement.sendKeys(firstName);
        WebElement lastNameElement = driver.findElement(By.xpath("//*[@id='input-lastname']"));
        lastNameElement.sendKeys(lastName);
        WebElement emailElement = driver.findElement(By.xpath("//*[@id='input-email']"));
        emailElement.sendKeys(email);
        WebElement passwordElement = driver.findElement(By.xpath("//*[@id='input-password']"));
        passwordElement.sendKeys(password);
        WebElement agreeCheckbox = driver.findElement(By.xpath("//*[@name='agree']"));
        agreeCheckbox.click();
        WebElement continueButton = driver.findElement(By.xpath("//*[@type='submit']"));
        continueButton.click();
    }

    public void navigateToProductPage() {
        driver.findElement(By.xpath("//nav[1]/ul[1]/li[2]/a[1]")).click();
        WebElement productCatalogButton = driver.findElement(By.xpath("//nav[1]/ul[1]/li[2]/ul[1]/li[2]/a[1]"));
        wait.until(webDriver -> productCatalogButton.isEnabled());
        productCatalogButton.click();

    }

    //returns a string with the name of the first item in the wishlist
    public String getFirstInWishlist() {
        //navigate to wishlist
        navigateToWishList();
        try{
            //click the first product
            return driver.findElement(By.xpath("//td[2]/a[1]")).getText();
        } catch (Exception e){
            //if no products in wishlist
            return null;

        }
    }

    public void navigateToWishList(){
        //navigate to wishlist
        navigateToHomePage();
        driver.findElement(By.xpath("//li[3]/a[1]/span[1]")).click();
    }

    public void addProduct(String name, String tag, String model, String SEO) throws InterruptedException {
        //navigate to add product window
        navigateToProductPage();
        //put in product fields
        driver.findElement(By.xpath("//div[1]/div[1]/div[1]/a[1]/i[1]")).click();
        driver.findElement(By.xpath("//div[1]/div[1]/div[1]/div[1]/div[1]/input[1]")).sendKeys(name);
        driver.findElement(By.xpath("//*[@id='input-meta-title-1']")).sendKeys(tag);
        driver.findElement(By.xpath("//form[1]/ul[1]/li[2]/a[1]")).click();
        driver.findElement(By.xpath("//*[@id='input-model']")).sendKeys(model);
        driver.findElement(By.xpath("//form[1]/ul[1]/li[11]/a[1]")).click();
        driver.findElement(By.xpath("//*[@id='input-keyword-0-1']")).sendKeys(SEO);
        //save product
        driver.findElement(By.xpath("//div[2]/div[1]/div[1]/div[1]/button[1]")).click();

        //close notification
        Thread.sleep(1000);
        driver.findElement(By.className("btn-close")).click();
    }

    public void addProduct(String name) throws InterruptedException {
        addProduct(name, product1_tag, product1_model, product1_SEO);
    }

    public void removeProduct(String name) throws InterruptedException {
        navigateToProductPage();
        //search product by filter
        driver.findElement(By.xpath("//*[@id='input-name']")).sendKeys(name);
        driver.findElement(By.xpath("//div[1]/div[1]/div[1]/div[2]/div[6]/button[1]")).click();

        Thread.sleep(1000);
        //selecting product
        driver.findElement(By.xpath("//tbody[1]/tr[1]/td[1]/input[1]")).click();
        
        //delete product
        driver.findElement(By.xpath("//button[3]")).click();
        driver.switchTo().alert().accept();

        //close notification
        Thread.sleep(1000);
        driver.findElement(By.className("btn-close")).click();
    }

    //adds item with name to wishlist
    public void addToWishListFromHomepage(String productName) throws InterruptedException {
        navigateToHomePage();
        //input search term
        driver.findElement(By.xpath("//header[1]/div[1]/div[1]/div[2]/div[1]/input[1]")).sendKeys(productName);
        //press search button
        driver.findElement(By.xpath("//header[1]/div[1]/div[1]/div[2]/div[1]/button[1]/i[1]")).click();
        //press heart <3
        Thread.sleep(1000);
        jse = (JavascriptExecutor)driver;
        jse.executeScript("window.scrollTo(0,document.body.scrollHeight);");
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id='product-list']/div/div/div/form/div/button[2]")).click();
        Thread.sleep(1000);
    }

    public void adminLogin() throws InterruptedException {
        driver.get("http://localhost/opencart/admin");
        //enter username
        WebElement usernameField = driver.findElement(By.xpath("//*[@id='input-username']"));
        usernameField.sendKeys(admin_username);
        //enter password
        WebElement passwordField = driver.findElement(By.xpath("//*[@id='input-password']"));
        passwordField.sendKeys(admin_password);
        passwordField.sendKeys(Keys.ENTER);
        //press close dialog button
        Thread.sleep(1000);
        WebElement closeButton = driver.findElement(By.className("btn-close"));
        closeButton.click();
    }

    public void adminLogout(){
        WebElement logoutButton = driver.findElement(By.xpath("//li[4]/a[1]/span[1]"));
        logoutButton.click();
    }

    public void before() throws InterruptedException {
        registerUser(user1_firstName, user1_lastName, user1_email, user1_password);
        Thread.sleep(1000);
        logout();
    }

    public void teardown() throws InterruptedException {

        adminLogin();
        Thread.sleep(1000);
        try {
            //delete user
            deleteUser(user1_email);
        } catch (Exception e) {
            System.out.println("User not found");
        }

        try {
            //delete product if exists
            removeProduct(product1_name);
        } catch (Exception e) {
            System.out.println("Product not found");
        }
        adminLogout();
    }

    public void closeDriver(){
        driver.close();
        driver.quit();
    }

    public void deleteUser(String email) throws InterruptedException {
        //nav to user list
        driver.findElement(By.xpath("//div[3]/div[1]/div[3]/a[1]")).click();

        //search for user
        driver.findElement(By.xpath("//*[@id='input-email']")).sendKeys(email);
        driver.findElement(By.xpath("//*[@id='button-filter']")).click();

        Thread.sleep(1000);
        //select user
        driver.findElement(By.xpath("//tbody[1]/tr[1]/td[1]/input[1]")).click();

        //delete user
        driver.findElement(By.xpath("//button[2]")).click();
        driver.switchTo().alert().accept();

        //close notification
        Thread.sleep(1000);
        driver.findElement(By.className("btn-close")).click();
    }

    public void navigateToHomePage() {
        // Navigate to the OpenCart website
        driver.get("http://localhost/opencart/");

    }

    public void navigateToLoginPage() {
        // Navigate to the OpenCart website
        driver.get("http://localhost/opencart/index.php?route=account/login&language=en-gb");
    }

    public void login(String email, String password){
        navigateToLoginPage();

        //input email
        driver.findElement(By.xpath("//*[@id='input-email']")).sendKeys(email) ;

        //input password
        driver.findElement(By.xpath("//*[@id='input-password']")).sendKeys(password);

        //press login button
        driver.findElement(By.xpath("//div[3]/button[1]")).click();
    }

    public void logout(){

        //click on account button
        driver.findElement(By.xpath("//div[1]/div[2]/ul[1]/li[2]/div[1]/a[1]")).click();

        //press logout button
        driver.findElement(By.xpath("//li[2]/div[1]/ul[1]/li[5]/a[1]")).click();
    }

    public boolean productIsDeleted(String product_name) {
        navigateToProductPage();

        //search the product
        driver.findElement(By.xpath("//*[@id='input-name']")).sendKeys(product_name);
        driver.findElement(By.xpath("//div[1]/div[1]/div[1]/div[2]/div[6]/button[1]")).click();

        //get the no results message
        try{
            Thread.sleep(1000);
            //if doesnt crash always returns true - because it will work only if the element is found
            return driver.findElement(By.xpath("//form[1]/div[2]/div[2]")).getText().equals("Showing 0 to 0 of 0 (0 Pages)");
        }catch (Exception e){
            return false;
        }
    }

}
