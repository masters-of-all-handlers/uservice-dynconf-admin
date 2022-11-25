const {defineConfig} = require("cypress");
const webpackPreprocessor = require('@cypress/webpack-preprocessor');

const options = webpackPreprocessor.defaultOptions;
options.webpackOptions.module.rules.push({
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
});
module.exports = defineConfig(
  {
    video: false,
    watchForFileChanges: true,
    e2e: {
      supportFile: false,
      defaultCommandTimeout: 5000,
      setupNodeEvents(on, config) {
        on('file:preprocessor', webpackPreprocessor(options))
      },
      baseUrl: process.env.CYPRESS_TEST_HOST
    },
    reporter: '../node_modules/cypress-multi-reporters',
    reporterOptions: {
      configFile: 'cypress-reporter.config.json'
    },
    env: process.env,
  }
)
