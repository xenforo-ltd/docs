import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Documentation',
  tagline: 'Documentation for XenForo',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://xenforo.com',
  baseUrl: '/docs/',

  organizationName: 'xenforo-ltd',
  projectName: 'docs',

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
  } satisfies Preset.ThemeConfig,
};

export default config;
