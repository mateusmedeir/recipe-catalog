module.exports = {
  "env": {
        "browser": true,
        "es2021": true
    },
  "extends": [
      "eslint:recommended",
      'plugin:@next/next/recommended',
      "next/core-web-vitals",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "globals": {
    "React": true,
  },
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/no-empty-object-type": ["off"],
    "@typescript-eslint/no-unused-expressions": ["error", { "allowShortCircuit": true }]
  }
};