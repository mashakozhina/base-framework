const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const playwright = require('eslint-plugin-playwright');
const prettierConfig = require('eslint-config-prettier');

const baseTsRules = {
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...tsPlugin.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/test-results/**', '**/playwright-report*/**', '**/jest-report*/**'],
  },
  {
    files: ['api-tests/**/*.ts'],
    ...baseTsRules,
    rules: {
      ...baseTsRules.rules,
      // response bodies are typed `any` (ParsedResponse), matching qa-apis's HttpClient —
      // cast to a specific interface where a test needs the shape, rather than threading generics through
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['ui-tests/**/*.ts'],
    languageOptions: baseTsRules.languageOptions,
    plugins: {
      ...playwright.configs['flat/recommended'].plugins,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      ...tsPlugin.configs.recommended.rules,
      // page-object methods hold the assertions — suppress false positives in specs
      'playwright/expect-expect': 'warn',
    },
  },
  prettierConfig,
];
