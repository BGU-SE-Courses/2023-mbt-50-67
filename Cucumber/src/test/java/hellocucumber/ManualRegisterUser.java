package hellocucumber;

public class ManualRegisterUser {
    private static final StepImp stepImp = new StepImp("Selenium\\chromedriver.exe");


    public static void main(String[] args) {
        System.out.println("manual register user");
        try{
            stepImp.before(); //register user
            stepImp.closeDriver();
        } catch (InterruptedException ignore) {
            System.out.println("register user failed");
        }
    }
}
