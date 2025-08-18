// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

// Node 22 has import.meta.dirname, so no __dirname shim needed.
// If you prefer __dirname, add the fileURLToPath/dirname shim.

export default tseslint.config(
  // Top-level ignores (was ignorePatterns)
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "*.config.js",
      "eslint.config.ts",
      "jest.config.ts",
      "vite.config.ts",
    ],
  },

  // Main config
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      // Use the `globals` package instead of @eslint/js.environments
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // equivalent to "extends: ['eslint:recommended']"
      ...js.configs.recommended.rules,

      "no-console": "warn",
      "no-unused-vars": "off",
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
    },
  },

  // Tests override (flat-config version of overrides)
  {
    files: [
      "**/*.test.ts",
      "**/*.test.js",
      "**/*.spec.ts",
      "**/*.spec.js",
      "src/tests/**/*",
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2020,
        jest: true,
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
);
