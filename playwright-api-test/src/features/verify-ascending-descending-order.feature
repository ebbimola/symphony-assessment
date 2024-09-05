Feature: SauceDemo Login and Assert Product Alphabetical Order
Note: 
  Verify that the items are sorted by Name ( A - Z )/(Z - A).

  Background: Login to SauceDemo
    Given I open the SauceDemo login page
    When I login as "standard" user

  Scenario: Login successfully with valid credentials
    Then I should be redirected to the products page
    Then Verify item sorting in alphabetical order

  Scenario: Verify Reverse/Descending Order
    Then I should be redirected to the products page
    Then Verify item sorting in reverse alphabetical order
