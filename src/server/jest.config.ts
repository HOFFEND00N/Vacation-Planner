const config = {
  moduleFileExtensions: ["ts", "js"],
  transform: { "\\.ts$": "ts-jest" },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
export default config;
