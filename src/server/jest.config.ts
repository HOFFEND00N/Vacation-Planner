const config = {
  moduleFileExtensions: ["ts", "js"],
  transform: { "\\.ts$": "ts-jest" },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  coveragePathIgnorePatterns: ["/DBHelpers/deleteUnapprovedVacation.ts", "/DBHelpers/getTeamVacations.ts"],
};
export default config;
