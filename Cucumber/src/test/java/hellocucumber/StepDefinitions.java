package hellocucumber;

import dev.failsafe.internal.util.Assert;
import io.cucumber.java.Before;
import io.cucumber.java.en.*;
import io.cucumber.java.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assertions.*;

public class StepDefinitions {

    private final StepImp stepImp = new StepImp();

    public StepDefinitions() throws InterruptedException {
    }

    @Before
    public void before(){
        System.out.println("setup");
        try {
            stepImp.before();
        }catch (Exception e){
            System.out.println("setup failed");
        }
    }

    @After
    public void teardown() {

        System.out.println("teardown");
        try{
            Thread.sleep(1000);
            stepImp.teardown();
        } catch (InterruptedException ignore) {
            System.out.println("teardown failed");
        }
    }


    // $$*TODO* explain what this step does$$
    @Given("product {string} exists")
    public void productExists(String product_name) {
        System.out.println("create product for case");
        Assertions.assertDoesNotThrow(stepImp::adminLogin);
        Assertions.assertDoesNotThrow(() -> stepImp.addProduct(product_name));
    }

    // $$*TODO* explain what this step does$$
    @And("user {string} logged in with password {string}")
    public void userLoggedInWithPassword(String email, String password) {
        System.out.println("login user");
        stepImp.login(email, password);
    }

    // $$*TODO* explain what this step does$$
    @When("the user adds product {string} to wishlist")
    public void userAddsProductToWishlist(String product_name){
        System.out.println("add product to wishlist");
        Assertions.assertDoesNotThrow(() -> stepImp.addToWishListFromHomepage(product_name));
    }
    // $$*TODO* explain what this step does$$
    @Then("product {string} is in the wishlist")
    public void productIsInUserWishlist(String product_name){
        System.out.println("check product in wishlist");
        Assertions.assertEquals(product_name, stepImp.getFirstInWishlist());
    }

    @When("the admin deletes product {string}")
    public void theAdminDeletesProduct(String product_name) {
        Assertions.assertDoesNotThrow(() -> stepImp.removeProduct(product_name));
    }

    @Then("product {string} is deleted")
    public void productIsDeleted(String product_name) {
        Assertions.assertTrue(stepImp.productIsDeleted(product_name));
    }

    @And("user has empty wishlist")
    public void productIsNotInTheWishlist() {
        System.out.println("check product in wishlist");
        Assertions.assertNull(stepImp.getFirstInWishlist());
    }

    @And("the admin logs in and deletes product {string}")
    public void theAdminLogsInAndDeletesProduct(String product_name) {
        Assertions.assertDoesNotThrow(stepImp::adminLogin);
        Assertions.assertDoesNotThrow(() -> stepImp.removeProduct(product_name));
    }
}