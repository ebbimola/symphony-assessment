const { Given, When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { efill } = require("../../utils/actions.js");
const { setup, close } = require("../../utils/setup.js");
const { pages, selectors, userTypes } = require("../../config/params.json");

let page;
let username;
let password;

Given("I open the SauceDemo login page", async () => {
  page = await setup();
  await page.goto("https://www.saucedemo.com/");
});

When("I login as {string} user", async (userType) => {
  username = userTypes[userType].username;
  password = userTypes[userType].password;
  await page.getByPlaceholder(selectors.username).fill(username);
  await page.getByPlaceholder(selectors.password).fill(password);
  await page.screenshot({
    path: "screenshots/username.png",
    fullPage: false,
  });
  await page.locator(selectors.loginButton).click({ force: true });
});

Then("I should be redirected to the products page", async () => {
  const url = page.url();
  expect(url).toContain(pages.inventory);
  await page.screenshot({
    path: "screenshots/inventory.png",
    fullPage: false,
  });
});

Then("Verify item sorting in alphabetical order", async () => {
  const itemNames = await page.$$eval(selectors.inventoryItem, (items) =>
    items.map((item) => item.textContent?.trim() || "")
  );
  const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b));
  expect(itemNames).toEqual(sortedNames);
  await page.screenshot({
    path: "screenshots/a-z.png",
    fullPage: true,
  });
});

Then("Verify item sorting in reverse alphabetical order", async () => {
  await page.selectOption(selectors.productSort, { label: "Name (Z to A)" });
  const itemNames = await page.$$eval(selectors.inventoryItem, (items) =>
    items.map((item) => item.textContent?.trim() || "")
  );
  const sortedItemNames = [...itemNames].sort().reverse();
  expect(itemNames).toEqual(sortedItemNames);
  await page.screenshot({
    path: "screenshots/z-a.png",
    fullPage: false,
  });
});

After(async () => {
  await close();
});
