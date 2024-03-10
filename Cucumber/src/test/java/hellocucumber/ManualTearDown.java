package hellocucumber;

public class ManualTearDown {
    private static final StepImp stepImp = new StepImp("Selenium\\chromedriver.exe");

    public static void main(String[] args) {
        System.out.println("manual teardown");
        try{
            stepImp.teardown();
        } catch (InterruptedException ignore) {
            System.out.println("teardown failed");
        }
    }
}
