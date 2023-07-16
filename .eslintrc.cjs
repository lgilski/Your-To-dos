/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  root: true,
  extends: [
    'plugin:vitest-globals/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    NodeJS: true,
    React: true,
  },
  env: {
    browser: true,
    es2022: true,
    'vitest-globals/env': true,
    'cypress/globals': true,
  },
  overrides: [
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
    {
      files: ['*.tsx, *.jsx'],
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false,
            },
          },
        ],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'cypress', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-var': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    // 'no-undef': process.env.NODE_ENV === 'production' ? 'warn' : 'error',
    'no-undef': 'warn',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'warn' : 'error',
    // 'prettier/prettier': ['error', { singleQuote: true }],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars':
      process.env.NODE_ENV === 'production' ? 'warn' : 'error',
    '@typescript-eslint/no-namespace': 'off',
  },
};
