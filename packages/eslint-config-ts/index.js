// follow javascript style from [here](https://github.com/airbnb/javascript)

const shared = require('./shared');

module.exports = {
  ...shared,
  extends: ['@arcblock/eslint-config', 'airbnb-typescript'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'require-await': 'error',
  },
};
