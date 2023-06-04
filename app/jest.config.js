const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { defaults } = require("jest-config");
const { compilerOptions } = require("./tsconfig.json");
module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  coverageDirectory: "coverage",
  coverageThreshold: {
    // The goal here is to have all above 80 and will be increasing this from time to time
    global: {
      statements: 60,
      branches: 40,
      functions: 40,
      lines: 60,
    },
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "node_modules/",
    "index.tsx",
    "index.tsx",
    "global.d.ts",
    ".d.ts",
    "src/stories/",
    "theme/",
    "src/api-services/graphql",
    "src/pages/skeleton-poc",
  ],
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
};
