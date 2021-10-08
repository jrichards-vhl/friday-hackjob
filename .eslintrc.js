module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
  },
  'ignorePatterns': [
    'node_modules',
    'dist',
    'spec/coverage',
    'spec/fixtures/assets/bundle',
    'sandbox/public/assets/bundle',
  ],
  'overrides': [
    {
      files: ['./src/**/*.js'],
      rules: {
        'indent': [
          'error', 2, {
            'CallExpression': {
              'arguments': 1,
            },
          },
        ],
      },
    },
    {
      files: ['**/*spec.js'],
      env: {
        jest: true,
      },
    },
  ],
};
