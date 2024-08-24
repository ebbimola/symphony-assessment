const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return on, config;
}

module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://www.saucedemo.com",
    specPattern: "**/*.feature",
    stepDefinitions: "support/[step_definitons]/*.steps.{js}",
    setupNodeEvents,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    video: true,
    chromeWebSecurity: false,
    blockHosts: [
      "events.backtrace.io",
      "events.backtrace.io/api/unique-events/submit",
    ],
  },
});
