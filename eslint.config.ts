import docusaurus from "@docusaurus/eslint-plugin";
import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import type { ESLint, Linter } from "eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([".docusaurus/", "build/", "docs/api/"], "xenforo/ignores"),
  {
    name: "xenforo/javascript",
    files: ["**/*.{js,jsx,mjs,ts,tsx}"],
    plugins: {
      "@docusaurus": docusaurus as unknown as ESLint.Plugin,
    },
    rules: docusaurus.configs.recommended.rules as Partial<Linter.RulesRecord>,
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      globals: globals.nodeBuiltin,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.mjs"],
        },
      },
    },
  },
  {
    name: "xenforo/json",
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    name: "xenforo/css",
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
    rules: {
      "css/use-baseline": ["error", { allowSelectors: ["nesting"] }],
      "css/no-invalid-properties": ["error", { allowUnknownVariables: true }],
      "css/relative-font-units": "error",
      "css/use-layers": "error",
    },
  },
);
