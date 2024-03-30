# Software Quality Engineering - System Testing
This is a repository for the system-testing assignment of the Software Quality Engineering course at the [Ben-Gurion University](https://in.bgu.ac.il/), Israel.

## Assignment Description
In this assignment, we tested an open-source software called [software name](https://www.opencart.com/).

this is a website used for online shopping, with amazon-like features

## Installation
first set up the opencart website on local host using the guide on the following link [opencart-guide](https://www.youtube.com/watch?v=uIWGm1vcNZc)
secondly you need to install provengo [provengo_installation](https://docs.provengo.tech/ProvengoCli/0.9.5/installation.html)
for cucumber u can use the files from this project
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
  
*Expected outcome:*
- the product got deleted from the system


## How we tested
We used two different testing methods:
1. [Cucumber](https://cucumber.io/), a behavior-driven testing framework.
2. [Provengo](https://provengo.tech/), a story-based testing framework.

Each of the testing methods is elaborated in its own directory. 

