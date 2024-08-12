import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  prettier,
  {
    rules: {
      'no-unused-vars': 'warn',
      indent: 2,
      'linebreak-style': ['error', 'unix'],
      quotes: ['warm', 'single'],
      semi: ['warm', 'never'],
    },
  },
  eslintConfigPrettier,
]
