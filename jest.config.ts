/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  roots: ["./src"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.jsx?$": ["ts-jest", { tsconfig: "./tsconfig.jest.json" }],
  },
};

module.exports = createJestConfig(config);
