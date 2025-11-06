const { defineConfig } = require("cypress");
const mochawesomeReporter = require("cypress-mochawesome-reporter/plugin");
const { removeDirectory } = require("cypress-delete-downloads-folder");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "My Cypress Report",
    embeddedScreenshots: true,
    inlineAssets: true,
  },

  e2e: {
    baseUrl: "https://test-cloud.intellifinder.dk",
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 60000,
    responseTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mochawesomeReporter(on);
      on("task", { removeDirectory });

      return config;
    },
    screenshotOnRunFailure: true,
  },
});
