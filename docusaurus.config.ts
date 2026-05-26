import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { createInfoPageMD } from "./src/openapi/createInfoPageMD";

const config: Config = {
  title: "XenForo Documentation",
  tagline: "Documentation for XenForo",
  favicon: "img/favicon.png",

  url: "https://docs.xenforo.com",
  baseUrl: "/",
  trailingSlash: false,

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    faster: true, // Enable modernized build infrastructure
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        blog: false,
        pages: false,

        theme: {
          customCss: ["./src/css/custom.css"],
        },

        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/xenforo-ltd/docs/edit/main/",
          docItemComponent: "@theme/ApiItem",
        },

        sitemap: {
          lastmod: "datetime",
          changefreq: null,
          priority: null,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic",

        config: {
          xenforo: {
            specPath: "static/api/openapi.json",
            outputDir: "docs/api",
            infoTemplate: "./src/openapi/infoTemplate.mustache",
            downloadUrl: "https://docs.xenforo.com/api/openapi.json",
            hideSendButton: true,
            showSchemas: true,

            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },

            markdownGenerators: {
              createInfoPageMD,
            },
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig: {
    image: "img/xenforo-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },

    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },

    navbar: {
      title: "Documentation",

      logo: {
        src: "img/logo.svg",
        alt: "XenForo",
        width: 124,
        height: 26,
      },

      items: [
        {
          type: "docSidebar",
          sidebarId: "manual",
          label: "Manual",
          position: "left",
        },
        {
          type: "docSidebar",
          sidebarId: "developers",
          label: "Developers",
          position: "left",
        },
        {
          type: "docSidebar",
          sidebarId: "api",
          label: "API",
          position: "left",
        },

        {
          label: "Community",
          href: "https://xenforo.com/community/",
          position: "right",
        },
        {
          label: "GitHub",
          href: "https://github.com/xenforo-ltd/docs",
          position: "right",
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["apacheconf", "bash", "ini", "php", "sql"],
    },

    algolia: {
      appId: "YW6LXZMEKF",
      apiKey: "80cdb7d3922b3717ceec76c4d13ca2d6",
      indexName: "XenForo Documentation",
    },

    languageTabs: [
      {
        language: "curl",
        highlight: "bash",
        variants: ["curl"],
      },
      {
        language: "php",
        highlight: "php",
        variants: ["guzzle"],
      },
      {
        language: "javascript",
        highlight: "javascript",
        variants: ["fetch"],
      },
      {
        language: "go",
        highlight: "go",
        variants: ["native"],
      },
      {
        language: "python",
        highlight: "python",
        variants: ["requests"],
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
