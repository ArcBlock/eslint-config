const prettierRules = require('./prettier.js');

module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['unicorn'],
  rules: {
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': ['error', { caseSensitive: true }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'prefer-object-spread': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
        },
      },
    ],
    ...prettierRules,
  },
};
