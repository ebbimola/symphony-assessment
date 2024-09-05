const reporter = require("cucumber-html-reporter");

var date = new Date();

var currentDate =
  date.getDate() +
  "-" +
  (date.getMonth() + 1) +
  "-" +
  date.getFullYear() +
  " " +
  date.getHours() +
  "h" +
  date.getMinutes() +
  "m" +
  date.getSeconds() +
  "_" +
  date.getMilliseconds();

var options = {
  brandTitle: "Symphony Assessment UI Test",
  theme: "bootstrap",
  jsonFile: "Reports/cucumber_report.json",
  output: "Reports/cucumber_report_" + currentDate + ".html",
  reportSuiteAsScenarios: true,
  screenshotsDirectory: "/screenshots/",
  storeScreenshots: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "QA",
    Platform: "Web",
    Sprint: "Assessment",
  },
};

reporter.generate(options);
