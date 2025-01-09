const { defineConfig } = require('cypress');
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'My Cypress Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },

  e2e: {
    baseUrl: 'https://test-cloud.intellifinder.dk',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mochawesomeReporter(on);
      return config;
    },
    screenshotOnRunFailure: true,
  },
});