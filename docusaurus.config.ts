import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: 'Documentation',
  tagline: 'Documentation for XenForo',
  favicon: 'img/favicon.png',

  url: 'https://docs.xenforo.com',
  baseUrl: '/docs/',

  organizationName: 'xenforo-ltd',
  projectName: 'docs',
  deploymentBranch: 'main',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/xenforo-ltd/docs/edit/main/',
          docItemComponent: "@theme/ApiItem",
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],
        },
        sitemap: {
          // https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#additional-notes-about-xml-sitemaps
          lastmod: "date",
          changefreq: null,
          priority: null,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-markdown-source-plugin',
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          xenforo: {
            specPath: "static/api/openapi.json",
            outputDir: "docs/api",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
            hideSendButton: false
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig: {
    image: 'img/xenforo-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Documentation',
      logo: {
        alt: 'XenForo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'manualSidebar',
          position: 'left',
          label: 'Manual',
        },
        {
          type: 'docSidebar',
          sidebarId: 'developersSidebar',
          position: 'left',
          label: 'Developers',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://xenforo.com/community',
          label: 'Community',
          position: 'right',
        },
        {
          href: 'https://github.com/xenforo-ltd/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true
      }
    },
    footer: {
      style: 'dark',
      copyright: `Documentation for XenForo® © 2010-${new Date().getFullYear()} XenForo Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php', 'bash', 'json', 'sql', 'apacheconf', 'ini'],
    },
    algolia: {
      appId: 'YW6LXZMEKF',
      apiKey: '80cdb7d3922b3717ceec76c4d13ca2d6',
      indexName: 'Docs',
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "php",
        language: "php",
        logoClass: "php",
      },
      {
        highlight: "javascript",
        language: "javascript",
        logoClass: "javascript",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      }
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
