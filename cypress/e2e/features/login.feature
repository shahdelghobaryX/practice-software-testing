Feature: Login Functionality

Scenario: Valid Login

Given user opens login page
When user enters valid email
And user enters valid password
And user clicks login
Then user should login successfully