const config = {
  moduleFileExtensions: ["ts", "js", "tsx", "jsx"],
  transform: { "\\.tsx?$": "ts-jest" },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: ["/application/"],
};
export default config;
