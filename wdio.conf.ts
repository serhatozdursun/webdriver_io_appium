import { deviceCapabilities } from './src/conf/platformConfig.ts';

export const config: WebdriverIO.Config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  // ==================
  // Specify Test Files
  // ==================
  specs: ['./src/test/specs/**/*.ts'],
  exclude: [],

  // ==========
  // Capabilities
  // ==========
  maxInstances: 10,
  capabilities: [deviceCapabilities],

  // ===================
  // Appium Settings
  // ===================
  services: [
    [
      'appium',
      {
        command: 'appium', // Ensure Appium is installed globally or provide the path
        appiumArgs: [
          '--address',
          '127.0.0.1',
          '--port',
          '4723',
          /*          '--log-level',
          'debug',*/
        ], // Connect to your Appium server
        logLevel: 'debug',
      },
    ],
  ],

  // ===================
  // Allure Report Settings
  // ===================
  reporters: [
    'spec', // Keeps console output
    [
      'allure',
      {
        outputDir: 'allure-results', // Directory to store Allure results
        disableWebdriverStepsReporting: false, // Logs WebDriver commands
        disableWebdriverScreenshotsReporting: false, // Includes screenshots in the report
        addConsoleLogs: true, // Adds console logs to the report
      },
    ],
  ],

  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // =================
  // Test Framework
  // =================
  framework: 'jasmine',

  jasmineOpts: {
    defaultTimeoutInterval: 60000,
  },

  specFileRetries: 2,
  specFileRetriesDelay: 3,
  specFileRetriesDeferred: true,

  // =============
  // Hooks
  // =============
  onPrepare: function () {
    console.log('Starting test execution...');
  },
  onComplete: function () {
    console.log('Test execution completed.');
  },
};
