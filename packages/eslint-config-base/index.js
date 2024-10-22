// follow javascript style from [here](https://github.com/airbnb/javascript)

const prettierRules = require('./prettier.js');

module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['unicorn', 'jest'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  env: {
    es2021: true,
    node: true,
    mocha: true,
    jest: true,
  },
  ignorePatterns: [
    '*.min.*',
    '*.d.ts',
    '.blocklet',
    '.husky',
    'node_modules',
    'CHANGELOG.md',
    'dist',
    'build',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'temp',
    'packages-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'require-await': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-underscore-dangle': 'off',
    'prefer-object-spread': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
        },
      },
    ],
    'jest/no-disabled-tests': 'error', // disable test.skip()
    'jest/no-focused-tests': 'error', // disable test.only()
    ...prettierRules,
  },
};
