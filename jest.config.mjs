export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  testEnvironment: "node",
  transformIgnorePatterns: [
    "/node_modules/"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy"
  }
};
