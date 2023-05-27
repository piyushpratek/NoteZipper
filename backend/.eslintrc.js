
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  env: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    'no-unused-vars': 'warn',
    'comma-dangle': 'off',
    'jest/expect-expect': [
      'error',
      { assertFunctionNames: ['expect', 'request.**.expect'] },
    ],
    'no-console': 'warn',
    '@typescript-eslint/no-extra-semi': 'warn',
    '@typescript-eslint/semi': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/require-await': 'off',
  },
  overrides: [],
}

