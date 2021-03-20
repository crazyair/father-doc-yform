// umi-test default set
// https://github.com/umijs/umi/blob/master/packages/umi-test/src/index.js
module.exports = {
  verbose: true,
  setupFiles: ['./setupTests.js'],
  modulePathIgnorePatterns: ['/docs/', '/__snapshots__/', 'lib'],
  // coveragePathIgnorePatterns: ['/src/JackBox/'],
  coveragePathIgnorePatterns: ['/__test__/', 'lib', '/packages/yforms'],
  testPathIgnorePatterns: ['/packages/yforms'],
  // collectCoverage: true,
};
