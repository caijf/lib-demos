import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: [
      '*/*/dist/',
      '*/*/output',
      '*/*/dist-analyze/',
      '*/*/dev-dist/',
      '*/*/dist-ssr/',
      '*/*/types/',
      '*/*/build/',
      '*/*/docs-dist/',
      '*/*/coverage/',
      '*/*/lib/',
      '*/*/es/',
      '*/*/.dumi/'
    ]
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      ...reactHooks.configs.recommended.rules
    }
  }
);
