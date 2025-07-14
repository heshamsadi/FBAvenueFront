module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off', // Disabled to allow react-router-dom
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'linebreak-style': 'off',
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    'max-len': 'off',
    'object-curly-newline': ['error', {
      multiline: true,
      consistent: true,
    }],
    'react/button-has-type': ['error', {
      button: true,
      submit: true,
      reset: true,
    }],
  },
  overrides: [
    {
      files: ['src/components/Button.js'],
      rules: {
        'react/button-has-type': 'off',
      },
    },
  ],
}; 