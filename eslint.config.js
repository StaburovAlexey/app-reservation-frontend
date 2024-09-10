import globals from 'globals';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      vue,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/no-multiple-template-root': 'off',
      'no-console': 'warn',
      'no-debugger': 'warn',
      // Добавь свои правила или переопредели существующие здесь
    },
    settings: {
      prettier,
    },
  },
];
