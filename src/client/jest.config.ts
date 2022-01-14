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
  coveragePathIgnorePatterns: ["/application/"],
};
export default config;
