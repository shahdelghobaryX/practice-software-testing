Feature: Cart Functionality

@ignore
Scenario: Add product to cart

Given user opens home page
When user searches for a product
And user adds product to cart
And user goes to cart
Then product should be added successfully