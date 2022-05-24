let hasJest = true;
try {
  require.resolve('jest');
} catch {
  hasJest = false;
}

module.exports = {
  root: true,
  extends: hasJest ? ['@arcblock/eslint-config', 'plugin:jest/recommended'] : '@arcblock/eslint-config',
};
