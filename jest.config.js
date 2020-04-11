module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  "modulePaths": ["<rootDir>/src"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js,jsx}',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
  preset: 'ts-jest',
}
