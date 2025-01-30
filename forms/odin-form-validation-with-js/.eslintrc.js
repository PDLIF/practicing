module.exports = {
  "extends": [
    "airbnb-base",
    "eslint-config-prettier",
    "plugin:prettier/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["prettier"]
}