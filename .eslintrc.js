// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@stylistic', '@typescript-eslint'],
  rules: {
    '@stylistic/indent': ['error', 2],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/space-before-function-paren': ['error', 'never'],
    '@stylistic/space-before-blocks': ['error', 'always'],
    '@stylistic/no-extra-semi': ['error'],
    '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
    '@typescript-eslint/no-unused-vars': [1],
  },
};
