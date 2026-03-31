import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'playwright-report/**', 'test-results/**']
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      playwright
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...playwright.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      'playwright/expect-expect': 'off',
      'playwright/valid-title': 'off',
      'no-undef': 'off'
    }
  }
];
