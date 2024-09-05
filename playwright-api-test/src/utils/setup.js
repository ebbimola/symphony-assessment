const { chromium } = require("@playwright/test");

let page;
let context;
let browser;

/**
 * Initialize and return a new page instance.
 * @returns {Promise<Page>} The Playwright page instance.
 */
async function setup() {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  return page;
}

/**
 * Closes the browser.
 * @async
 * @function close
 * @returns {Promise<void>}
 */
async function close() {
  await browser.close();
}

/**
 * Creates a new context using the browser.
 * @returns {Promise<Context>} The newly created context.
 */
async function ctx() {
  context = await browser.newContext();
  return context;
}

/**
 * Utility function to wait for navigation after an action.
 * @param {Page} page - The Playwright page instance.
 */
async function waitForPageLoad(page) {
  await page.waitForNavigation({ waitUntil: "networkidle" });
}

module.exports = {
  ctx,
  setup,
  close,
  waitForPageLoad,
};
