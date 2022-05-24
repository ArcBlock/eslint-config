module.exports = {
  // repeat
  'arrow-parens': 'off',
  'implicit-arrow-linebreak': 'off',
  'no-confusing-arrow': 'off',
  'object-curly-newline': 'off',
  'operator-linebreak': 'off',
  'react/jsx-closing-bracket-location': 'off',
  'react/jsx-one-expression-per-line': 'off',

  // conflict
  // 'comma-dangle': [
  //   'error',
  //   {
  //     arrays: 'always-multiline',
  //     exports: 'always-multiline',
  //     functions: 'ignore',
  //     imports: 'always-multiline',
  //     objects: 'always-multiline',
  //   },
  // ],
  // indent: ['error', 2, { SwitchCase: 1 }],
  // 'linebreak-style': ['error', 'unix'],
  // 'max-len': [
  //   'error',
  //   {
  //     code: 120,
  //     ignoreComments: true,
  //     ignoreStrings: true,
  //   },
  // ],
  // quotes: ['error', 'single'],
  // semi: ['error', 'always'],

  // fix
  quotes: ['error', 'single', { avoidEscape: true }],
};
