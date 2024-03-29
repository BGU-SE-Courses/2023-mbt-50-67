# Testing OpenCart using Cucumber
This directory contains the cucumber files for testing the user wishlist and admin product management module of the OpenCart application.

## Tests Setup
In order to run our tests properly, one has to run the [ManualTearDown](src/test/java/hellocucumber/ManualTearDown.java)
after this, run the following file : [ManualRegisterUser](src/test/java/hellocucumber/ManualRegisterUser.java)

## Running the tests
In order to run our tests you need to open the project using the Inteliji IDE, navigate to the cucumber folder, from there to src/test/resources/hellocucumber and run each of the cucumber files there.

## Feature files
The behaviors that we tested are in the feature files that inside the [resources/hellocucumber](resources/hellocucumber) directory. See the files for a detailed description of the tests.



## Step files
The step files in the [src/test/java/hellocucumber](src/test/java/hellocucumber) directory contain the code that defines how each sentence in the feature files is translated to Selenium actions. See the files for a detailed description of the implementation.

