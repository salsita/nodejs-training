module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:security/recommended',
  ],
  env: {
    node: true,
    mocha: true,
  },
  rules: {
    'security/detect-object-injection': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'quote-props': [2, 'consistent-as-needed'],
    'function-paren-newline': ['error', 'consistent'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'mocha.bootstrap.js',
          '**/*.spec.js',
        ],
      },
    ],
  },
  plugins: [
    'import',
    'security',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
        moduleDirectory: ['node_modules'],
      },
    },
  },
};
