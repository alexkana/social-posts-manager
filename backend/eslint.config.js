import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-node";
import prettierPlugin from "eslint-plugin-prettier";
import securityPlugin from "eslint-plugin-security";
import prettierConfig from "eslint-config-prettier";

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // Configuration for TypeScript files (excluding tests)
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: ["src/tests/**/*", "tests/**/*"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      node: nodePlugin,
      prettier: prettierPlugin,
      security: securityPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-unused-vars": "off", // Turn off base rule
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          args: "after-used",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "security/detect-non-literal-regexp": "warn",
    },
  },

  // Configuration for JavaScript files
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    plugins: {
      import: importPlugin,
      node: nodePlugin,
      prettier: prettierPlugin,
      security: securityPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "no-console": "warn",
    },
  },

  // Configuration for test files (without TypeScript project parsing)
  {
    files: [
      "**/*.test.ts",
      "**/*.test.js",
      "**/*.spec.ts",
      "**/*.spec.js",
      "src/tests/**/*",
      "tests/**/*",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // Don't use project for test files
      },
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "no-console": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
    ],
  },

  // Apply Prettier config to disable conflicting rules
  prettierConfig,
];
