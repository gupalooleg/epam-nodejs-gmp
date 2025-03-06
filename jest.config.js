module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src/'],
  testMatch: ['<rootDir>/src/**/*.test.*s'],
  coveragePathIgnorePatterns: ['<rootDir>/src/test/'],
  verbose: true,
  reporters: ['default', 'jest-junit'],
  projects: [
    { preset: 'ts-jest', displayName: 'unit', testMatch: ['<rootDir>/src/**/*.unit.test.*s'] },
    {
      preset: 'ts-jest',
      displayName: 'integration',
      testMatch: ['<rootDir>/src/**/*.integration.test.*s'],
    },
    { preset: 'ts-jest', displayName: 'e2e', testMatch: ['<rootDir>/src/**/e2e/*.test.*s'] },
  ],
};
