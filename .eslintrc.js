module.exports = {
  parser: "@babel/eslint-parser",
  extends: "airbnb-base",
  env: {
    browser: true,
    node: true
  },
  rules: {
    quotes: ["error", "double"],
    "comma-dangle": ["error", "never"],
    semi: ["error", "never"],
    "operator-linebreak": "off",
    "func-names": "off",
    "no-console": "off"
  }
}
