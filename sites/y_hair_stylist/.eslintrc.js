module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },

  overrides: [
    {
      files: ['*.*'],
      rules: {
        'max-len': 'off',
      },
    },
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  plugins: [
  ],

  extends: [
    'plugin:security/recommended',
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
};
