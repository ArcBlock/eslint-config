# `@arcblock/eslint-config-arcblock`

[![npm version](https://badge.fury.io/js/%40arcblock%2Feslint-config-arcblock.svg)](https://badge.fury.io/js/%40arcblock%2Feslint-config-arcblock)

This package provides Arcblock's JS .eslintrc (with React plugins) as an extensible shared config.

## Usage

We export two ESLint configurations for your usage.

### eslint-config-arcblock

Our default export contains all of our ESLint rules, including ECMAScript 6+. It requires `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-unicorn`.

1. Install the correct versions of each package.

If using **npm 5+**, use this shortcut

```sh
  npx install-peerdeps --dev @arcblock/eslint-config-arcblock
```

If using **yarn**, use this shortcut

```sh
  npx install-peerdeps --dev --yarn @arcblock/eslint-config-arcblock
```

2. Add `"extends": "@arcblock/eslint-config-arcblock"` to your `.eslintrc` file.
