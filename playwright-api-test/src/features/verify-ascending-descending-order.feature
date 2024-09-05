Feature: SauceDemo Login and Assert Product Alphabetical Order
Note: Verify that the items are sorted by Name ( A -&gt; Z ).

  Scenario: Login successfully with valid credentials
    Given I open the SauceDemo login page
    When I login as "standard" user
    Then I should be redirected to the products page
    Then Verify item sorting in alphabetical order

  Scenario: Verify Reverse/Descending Order
    Given I open the SauceDemo login page
    When I login as "standard" user
    Then I should be redirected to the products page
    Then Verify item sorting in reverse alphabetical order
