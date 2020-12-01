const { jsWithTs: tsjPreset } = require("ts-jest/presets");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  collectCoverageFrom: ["module/**/*.{js,ts}", "shared/**/*.{js,ts}"],
  transform: {
    ...tsjPreset.transform,
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname,
  }),
};
