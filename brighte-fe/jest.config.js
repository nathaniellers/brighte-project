/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // <== make sure this file exists
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
};
