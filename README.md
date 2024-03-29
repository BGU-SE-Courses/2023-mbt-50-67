# Software Quality Engineering - System Testing
This is a repository for the system-testing assignment of the Software Quality Engineering course at the [Ben-Gurion University](https://in.bgu.ac.il/), Israel.

## Assignment Description
In this assignment, we tested an open-source software called [software name](https://www.opencart.com/).

this is a website used for online shopping, with amazon-like features

## Installation
$$*TODO* Write instructions on how to install the software and prepare the testing environment$$

## What we tested
We tested a website for online shopping. We chose to test the following user stories: 

*first User story:* a user adds an item to his wishlist

*Preconditions:* 
- the user is registered to the system
- the user is logged in the system
- the product he tries to add exists in the system

*Expected outcome:* 
- the product is added to his wishlist

*second User story:* the admin deletes a product from the system

*Preconditions:* 
- the admin is registered as an admin user in the system
- the admin is logged in the system
- the product we want to delete exists in the system
*Expected outcome:* The student receives 100.
$$

## How we tested
We used two different testing methods:
1. [Cucumber](https://cucumber.io/), a behavior-driven testing framework.
2. [Provengo](https://provengo.tech/), a story-based testing framework.

Each of the testing methods is elaborated in its own directory. 

## Results
Update all README.md files (except for d-e, see Section 1). Specifically, replace all $$*TODO*…$$ according to the instructions inside the $$.
