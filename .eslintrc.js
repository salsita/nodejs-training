module.exports = {
  extends: [
    "eslint-config-airbnb-base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:security/recommended",
    "plugin:prettier/recommended"
  ],
  env: {
    node: true,
    mocha: true
  },
  rules: {
    "security/detect-object-injection": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["mocha.bootstrap.js", "**/*.spec.js"]
      }
    ]
  },
  plugins: ["import", "security"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".json"],
        moduleDirectory: ["node_modules"]
      }
    }
  }
};
