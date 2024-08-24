Feature: SauceDemo Login and Assert Product Reverse Alphabetical Order

Note: Change the sorting to Name ( Z -&gt; A).

  Scenario: Verify Reverse/Descending Order
    Given I open the SauceDemo login page
    When I login as "standard" user
    Then I should be redirected to the products page
    Then Verify item sorting in reverse alphabetical order
    