const config = {
  projects: ["src/client/", "src/server/"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
export default config;
