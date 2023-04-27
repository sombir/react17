/* eslint-disable import/no-anonymous-default-export */

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // All imported modules in your tests should be mocked automatically
  automock: false,
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // An array of regexp pattern strings used to coverage collection
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/api/**', '!**/externalComponents/**', '!**/hooks/**', '!**/i18n/**', '!**/providers/**', '!**/*.{d.ts,scss}'],
  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    //'defender-ui(.*)$': path.resolve('.', 'src/') + '$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  // A preset that is used as a base for Jest"s configuration
  preset: 'ts-jest',
  // Automatically reset mock state before every test
  resetMocks: true,
  // The root directory that Jest should scan for tests and modules within
  rootDir: './',
  // A list of paths to directories that Jest should use to search for files in
  roots: ['./src'],
  setupFiles: [],
  setupFilesAfterEnv: ['./config/jest/setupTests.js'],
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/**/**/*.test.[jt]s', '<rootDir>/**/**/*.test.[jt]sx'],
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': './config/jest/babelTransform.js',
    '^.+\\.css$': './config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': './config/jest/fileTransform.js'
  },
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['./node_modules/(?!@console)/', './node_modules/?!(carbon-icons)', './src/externalComponents'],
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  //Plugins that are used in watch mode
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
};
