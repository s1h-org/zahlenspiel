module.exports = {
  preset: "ts-jest",
  rootDir: "./src",
  testEnvironment: "node",
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
  verbose: true
};
