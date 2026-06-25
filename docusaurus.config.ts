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
    [
      "@docusaurus/plugin-client-redirects",
      {
        createRedirects: () => [],
        redirects: [
          { from: "/manual", to: "/" },
          {
            from: "/manual/access-privileges/promotion-birthday",
            to: "/manual/access-privileges/promotions/examples/promotion-birthday",
          },
          {
            from: "/manual/access-privileges/promotion-new-users",
            to: "/manual/access-privileges/promotions/examples/promotion-new-users",
          },
          {
            from: "/manual/appearance/languages",
            to: "/manual/appearance/ui-text/languages",
          },
          {
            from: "/manual/appearance/phrases",
            to: "/manual/appearance/ui-text/phrases",
          },
          {
            from: "/manual/appearance/style-properties",
            to: "/manual/appearance/theming/style-properties",
          },
          {
            from: "/manual/appearance/styles",
            to: "/manual/appearance/theming/styles",
          },
          {
            from: "/manual/appearance/template-modifications",
            to: "/manual/appearance/theming/template-modifications",
          },
          {
            from: "/manual/appearance/templates",
            to: "/manual/appearance/theming/templates",
          },
          {
            from: "/manual/configuration/captcha",
            to: "/manual/configuration/options-list/captcha",
          },
          {
            from: "/manual/configuration/closing",
            to: "/manual/configuration/options-list/closing",
          },
          {
            from: "/manual/configuration/email",
            to: "/manual/configuration/options-list/email",
          },
          {
            from: "/manual/configuration/friendly-urls",
            to: "/manual/configuration/options-list/friendly-urls",
          },
          {
            from: "/manual/configuration/index-page",
            to: "/manual/configuration/options-list/index-page",
          },
          {
            from: "/manual/configuration/options",
            to: "/manual/configuration/options-list",
          },
          {
            from: "/manual/configuration/proxy",
            to: "/manual/configuration/options-list/proxy",
          },
          {
            from: "/manual/configuration/seo",
            to: "/manual/configuration/options-list/seo",
          },
          {
            from: "/manual/configuration/sitemap",
            to: "/manual/configuration/options-list/seo#xml-sitemap-generation-and-submission",
          },
          {
            from: "/manual/content/attachments",
            to: "/manual/content/embeds/attachments",
          },
          {
            from: "/manual/content/bbcode-images",
            to: "/manual/content/embeds/bbcode-images",
          },
          {
            from: "/manual/content/bbcode-media-sites",
            to: "/manual/content/embeds/bbcode-media-sites",
          },
          {
            from: "/manual/content/content-voting",
            to: "/manual/content/attributes/content-voting",
          },
          {
            from: "/manual/content/giphy",
            to: "/manual/content/embeds/giphy",
          },
          { from: "/manual/content/overview", to: "/manual/content" },
          {
            from: "/manual/content/reactions",
            to: "/manual/content/attributes/reactions",
          },
          {
            from: "/manual/content/tags",
            to: "/manual/content/attributes/tags",
          },
          {
            from: "/manual/forums/articles",
            to: "/manual/forums/types/available/articles",
          },
          {
            from: "/manual/forums/discussions",
            to: "/manual/forums/types/available/discussions",
          },
          {
            from: "/manual/forums/forum-thread-types",
            to: "/manual/forums/types",
          },
          {
            from: "/manual/forums/questions",
            to: "/manual/forums/types/available/questions",
          },
          {
            from: "/manual/forums/suggestions",
            to: "/manual/forums/types/available/suggestions",
          },
          {
            from: "/manual/forums/thread-batch-update",
            to: "/manual/forums/threads/thread-batch-update",
          },
          {
            from: "/manual/forums/thread-fields",
            to: "/manual/forums/threads/thread-fields",
          },
          {
            from: "/manual/forums/thread-prefixes",
            to: "/manual/forums/threads/thread-prefixes",
          },
          {
            from: "/manual/forums/thread-prompts",
            to: "/manual/forums/threads/thread-prompts",
          },
          {
            from: "/manual/forums/thread-type-tools",
            to: "/manual/forums/types/thread-type-tools",
          },
          {
            from: "/manual/importing/import-notes-vbulletin",
            to: "/manual/importing/notes/import-notes-vbulletin",
          },
          {
            from: "/manual/importing/import-spec-vbulletin",
            to: "/manual/importing/notes/import-spec-vbulletin",
          },
          {
            from: "/manual/installing-and-upgrading/install-upgrade",
            to: "/manual/installing-and-upgrading",
          },
          { from: "/manual/terms-rules", to: "/manual/configuration/terms" },
          {
            from: "/manual/terms-rules/terms",
            to: "/manual/configuration/terms",
          },
          {
            from: "/manual/upgrade",
            to: "/manual/installing-and-upgrading/upgrade",
          },
          {
            from: "/manual/users/banning",
            to: "/manual/users/discipline/banning",
          },
          {
            from: "/manual/users/discouragement",
            to: "/manual/users/discipline/discouragement",
          },
          {
            from: "/manual/users/user-title-ladder",
            to: "/manual/users/gamification/user-title-ladder",
          },
          {
            from: "/manual/users/user-trophies",
            to: "/manual/users/gamification/user-trophies",
          },
          {
            from: "/manual/users/user-upgrade-premium-forum",
            to: "/manual/users/paid-upgrades/examples/user-upgrade-premium-forum",
          },
          {
            from: "/manual/users/user-upgrade-profile-banners",
            to: "/manual/users/paid-upgrades/examples/user-upgrade-profile-banners",
          },
          {
            from: "/manual/users/user-upgrades",
            to: "/manual/users/paid-upgrades",
          },
          {
            from: "/manual/users/warnings",
            to: "/manual/users/discipline/warnings",
          },
        ],
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig: {
    image: "img/xenforo-social-card.png",

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
