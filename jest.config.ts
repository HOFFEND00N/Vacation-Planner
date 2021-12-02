//TODO: use different configs for frontend/backend tests
const config = {
  moduleFileExtensions: ["ts", "js", "tsx", "jsx"],
  transform: { "\\.tsx?$": "ts-jest" },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: ["<rootDir>/src/client/application/", "<rootDir>/node_modules/"],
};
export default config;
