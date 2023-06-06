// follow javascript style from [here](https://github.com/airbnb/javascript)

const shared = require('./shared');

module.exports = {
  ...shared,
  extends: ['@arcblock/eslint-config-base', 'airbnb-typescript/base'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.ts'],
      },
    },
  },
  rules: {
    'require-await': 'error',
  },
};
