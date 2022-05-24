// follow javascript style from [here](https://github.com/airbnb/javascript/tree/master/react)

const prettierRules = require('./prettier.js');

module.exports = {
  // why we should use jsx-runtime
  // https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/jsx-runtime', 'plugin:prettier/recommended'],
  plugins: ['unicorn'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  env: {
    es2021: true,
    browser: true,
    node: true,
    mocha: true,
    jest: true,
  },
  globals: {
    document: 'readonly',
    navigator: 'readonly',
    window: 'readonly',
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
    'import/no-unresolved': ['error', { caseSensitive: true }],
    'import/extensions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'prefer-object-spread': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/sort-comp': 'off',
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
