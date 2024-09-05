const { setup } = require("./setup");

/**
 * Fill the input element with the given value.
 * @param {Page} page - The Playwright page instance
 * @param {string} selector - The selector of the element to fill
 * @param {string} value - The value to fill into the input
 */
async function efill(page, selector, value) {
  try {
    await page.getByPlaceholder(selector).fill(value);
  } catch (error) {
    console.error(`Failed to fill element with selector ${selector}:`, error);
  }
}

/**
 * Initialize and return a new page instance.
 * @returns {Promise<Page>} The Playwright page instance.
 */
async function getPageInstance() {
  try {
    const page = await setup();
    page.setDefaultTimeout(30000);
    return page;
  } catch (error) {
    console.error("Failed to setup page:", error);
    throw error;
  }
}

module.exports = {
  efill,
  getPageInstance,
};
