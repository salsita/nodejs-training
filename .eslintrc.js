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
    'import/extensions': ['error', { mjs: 'never' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'mocha.bootstrap.mjs',
          '**/*.spec.mjs',
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
        extensions: ['.js', '.mjs'],
        moduleDirectory: ['node_modules'],
      },
    },
  },
  globals: {
    sinon: true,
  },
};
