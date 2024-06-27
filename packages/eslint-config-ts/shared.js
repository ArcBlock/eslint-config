// follow javascript style from [here](https://github.com/airbnb/javascript)

const prettierRules = require('@arcblock/eslint-config-base/prettier');

module.exports = {
  extends: ['@arcblock/eslint-config-base'],
  plugins: ['unicorn'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    ...prettierRules,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
