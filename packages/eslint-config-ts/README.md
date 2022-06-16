# `@arcblock/eslint-config-ts`

[![npm version](https://badge.fury.io/js/%40arcblock%2Feslint-config-ts.svg)](https://badge.fury.io/js/%40arcblock%2Feslint-config-ts)

This package provides Arcblock's base JS .eslintrc (without React plugins) as an extensible shared config.

## Usage

We export two ESLint configurations for your usage.

### eslint-config-ts

Our default export contains all of our ESLint rules, including ECMAScript 6+. It requires `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import` and `eslint-plugin-unicorn`.

1. Install the correct versions of each package.

If using **npm 5+**, use this shortcut

```sh
  npx install-peerdeps --dev @arcblock/eslint-config-ts
```

If using **yarn**, use this shortcut

```sh
  npx install-peerdeps --dev --yarn @arcblock/eslint-config-ts
```

2. Add `"extends": "@arcblock/eslint-config-ts"` to your `.eslintrc` file.
