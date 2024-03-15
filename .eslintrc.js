module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    indent: [1, 2],
    quotes: [1, 'single'],
    'no-extra-semi': [1],
    semi: [1],
    'no-multiple-empty-lines': [1],
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/no-unused-vars': [1],
  },
};
