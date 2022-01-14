const config = {
  moduleFileExtensions: ["ts", "js"],
  transform: { "\\.ts$": "ts-jest" },
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
};
export default config;
