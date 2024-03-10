Feature: User adds product to wishlist; admin deletes the product from the store.

  Scenario Outline: User adds product to wishlist
    Given product "<product_name>" exists
    And   user "<email>" logged in with password "<password>"
    When  the user adds product "<product_name>" to wishlist
    Then  product "<product_name>" is in the wishlist

    Examples:
      | email          | password | product_name |
      | lior@gmail.com | lior123  | zloof        |


  Scenario Outline: Admin deletes the product from the store
      Given product "<product_name>" exists
      When  the admin deletes product "<product_name>"
      Then  product "<product_name>" is deleted

      Examples:
          | product_name |
          | zloof        |

  Scenario Outline: User adds product to wishlist, and then admin deletes the product from the store
    Given product "<product_name>" exists
    And   user "<email>" logged in with password "<password>"
    When  the user adds product "<product_name>" to wishlist
    And   the admin logs in and deletes product "<product_name>"
    Then  product "<product_name>" is deleted
    And   user has empty wishlist

    Examples:
      | email          | password | product_name |
      | lior@gmail.com | lior123  | zloof        |
