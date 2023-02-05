import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  globalSetup: './__tests__/setup.ts',
  globalTeardown: './__tests__/teardown.ts',
  maxWorkers: 1,
  maxConcurrency: 1,
  resetMocks: true,
  testTimeout: 10000,
  verbose: true,
}

export default config
