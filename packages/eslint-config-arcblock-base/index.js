module.exports = {
  extends: ['airbnb-base'],
  plugins: ['unicorn'],
  rules: {
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'implicit-arrow-linebreak': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': ['error', { caseSensitive: true, ignore: ['core/'] }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
      },
    ],
    'no-confusing-arrow': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'prefer-object-spread': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
        },
      },
    ],
  },
};
