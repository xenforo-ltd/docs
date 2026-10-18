import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import type { Plugin, RulesConfig } from "@eslint/core";
import globals from "globals";
import tseslint from "typescript-eslint";
import docusaurus from "@docusaurus/eslint-plugin";
import * as mdx from "eslint-plugin-mdx";

// TODO: refine this
export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{js,jsx,ts,tsx}"],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{js,jsx,ts,tsx}"],
  })),
  {
    plugins: { "@docusaurus": docusaurus as unknown as Plugin },
    rules: docusaurus.configs.recommended.rules as Partial<RulesConfig>,
  },
  {
    name: "xenforo/language-options",
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js"],
        },
        extraFileExtensions: [".mdx"],
      },
    },
  },
  {
    name: "xenforo/languages",
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    name: "xenforo/ignores",
    ignores: [".docusaurus/", "build/", "docs/api/"],
  },
  {
    name: "xenforo/mdx",
    files: ["**/*.mdx"],
    ...mdx.flat,
  },
  {
    name: "xenforo/mdx-code-blocks",
    files: ["**/*.mdx"],
    ...mdx.flatCodeBlocks,
  },
]);
