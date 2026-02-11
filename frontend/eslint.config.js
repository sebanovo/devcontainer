import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist/**'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      react.configs.flat['jsx-runtime'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      react,
    },
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_+$', varsIgnorePattern: '^_+$', caughtErrorsIgnorePattern: '^_+$' },
      ],
      'react/jsx-uses-vars': 'error',
      'prettier/prettier': 'error',
    },
  },
]);
