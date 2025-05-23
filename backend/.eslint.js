module.exports = {
    env: {
      node: true,
      es2021: true,
      jest: true // If you use Jest for testing
    },
    extends: [
      'eslint:recommended',
      'plugin:node/recommended',
      'plugin:security/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'prettier' // Must be last to override other configs
    ],
    plugins: ['prettier', 'security'],
    parserOptions: {
      ecmaVersion: 2021
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'node/exports-style': ['error', 'module.exports'],
      'node/file-extension-in-import': ['error', 'always'],
      'node/prefer-global/buffer': ['error', 'always'],
      'node/prefer-global/console': ['error', 'always'],
      'node/prefer-global/process': ['error', 'always'],
      'node/prefer-global/url-search-params': ['error', 'always'],
      'node/prefer-global/url': ['error', 'always'],
      'node/no-unpublished-require': 'off', // For development dependencies
      'security/detect-object-injection': 'off', // Often too strict
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ]
    }
  };