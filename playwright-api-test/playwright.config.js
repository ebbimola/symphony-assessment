const { defineConfig, devices } = require("@playwright/test");
const path = require("path");

module.exports = defineConfig({
  projects: [
    {
      name: "UI",
      testDir: "./src/features",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://www.saucedemo.com",
        actionTimeout: 30000,
        navigationTimeout: 30000,
        defaultBrowserType: "chromium",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },

    {
      name: "API",
      testDir: "./src/tests/endpoints",
      retries: 0,
      snapshotDir: path.join(__dirname, "screenshots"),
      timeout: 30000,
      expect: {
        timeout: 50000,
      },
      reporter: [["list"], ["json", { outputFile: "Reports/api_report.json" }]],
      use: {
        baseURL: "https://jsonplaceholder.typicode.com",
        extraHTTPHeaders: {
          accept: "application/json",
        },
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
  ],
});
