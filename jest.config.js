const config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['_element.js'],
  coverageDirectory: 'spec/coverage',
  coverageReporters: ['html'],
  moduleFileExtensions: [
    'js',
  ],
  modulePaths: ['src'],
  preset: 'jest-puppeteer',
  testMatch: ['<rootDir>/spec/**/*_spec.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};

module.exports = config;

