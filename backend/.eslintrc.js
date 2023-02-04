// Inspired from: https://stackoverflow.com/a/64488474/10012446
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    // 'comma-dangle': ['warn', 'always'],
    semi: 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-unsafe-assignment': 'off',
    'no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
  },
}
