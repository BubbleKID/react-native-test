module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': "module",
        'ecmaFeatures': {
          'jsx': true,
          'modules': true,
          'experimentalObjectRestSpread': true
        }
      },
    'env': {
      'jest': true,
    },
    'rules': {
      'no-use-before-define': 'off',
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'comma-dangle': 'off',
      'no-console': 'off',
      'global-require': 1,
      'no-underscore-dangle': 'allow'
    },
    'globals': {
      "fetch": false
    }
  }