// eslint-disable-next-line import/no-unused-modules
module.exports = {
  globals: {
    __DEV__: false,
    __PROD__: false,
    __TEST__: true,
    __DISABLE_LOGOUT_STATUSES__: false,
    __VERSION__: JSON.stringify(String(process.env.npm_package_version).substring(2)),
  },
  roots: ['<rootDir>/src'],
  coverageReporters: ['text'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/App/**',
    '!src/StandAlone/**',
  ],
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  testEnvironment: 'jsdom',
  testRunner: '<rootDir>/node_modules/jest-circus/runner.js',
  transform: {
    '^.+\\.(js|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['node_modules/(?!(@vtb|@omega/icons)/.*)'],
  modulePaths: [],
  moduleNameMapper: {
    '^host/(.*)': '<rootDir>/jest/__mocks__/host.ts',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  resetMocks: false,
};
