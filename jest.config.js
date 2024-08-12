module.exports = {
  // Configuration for integration tests
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setupTests.js'],
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  moduleFileExtensions: ['js', 'json'],
  // MongoDB Memory Server configuration
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
}
