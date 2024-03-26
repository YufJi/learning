/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^algorithm/(.*)$': '<rootDir>/algorithm/$1',
    '^programming/(.*)$': '<rootDir>/programming/$1',
  },
  collectCoverage: true,
  coverageDirectory: '../coverage', // relative to rootDir
};
