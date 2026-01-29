import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import apiSidebar from './docs/api/sidebar';

const sidebars: SidebarsConfig = {
  manualSidebar: [
    'manual/index',
    {
      type: 'category',
      label: 'Installing and upgrading',
      items: [
        'manual/install-upgrade',
        'manual/install',
        'manual/upgrade',
      ],
    },
    {
      type: 'category',
      label: 'Common concepts',
      items: [
        'manual/common-concepts',
        'manual/display-order',
        'manual/criteria',
        'manual/filter',
        'manual/cron',
      ],
    },
    {
      type: 'category',
      label: 'Users',
      items: [
        'manual/users',
        'manual/user-security',
        'manual/user-profile',
        'manual/user-fields',
        {
          type: 'category',
          label: 'Paid user upgrades',
          items: [
            'manual/user-upgrades',
            {
              type: 'category',
              label: 'User upgrade examples',
              items: [
                'manual/user-upgrade-premium-forum',
                'manual/user-upgrade-profile-banners',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Gamification',
          items: [
            'manual/user-trophies',
            'manual/user-title-ladder',
          ],
        },
        {
          type: 'category',
          label: 'Discipline',
          items: [
            'manual/warnings',
            'manual/banning',
            'manual/discouragement',
          ],
        },
        'manual/user-name-change',
        'manual/member-stats',
        'manual/user-batch-update',
      ],
    },
    {
      type: 'category',
      label: 'Access privileges',
      items: [
        'manual/groups-permissions',
        'manual/permissions',
        {
          type: 'category',
          label: 'Promotions',
          items: [
            'manual/promotions',
            {
              type: 'category',
              label: 'Promotion examples',
              items: [
                'manual/promotion-new-users',
                'manual/promotion-birthday',
              ],
            },
          ],
        },
        'manual/staff',
      ],
    },
    {
      type: 'category',
      label: 'Forums, threads and posts',
      items: [
        'manual/nodes-forums',
        {
          type: 'category',
          label: 'Threads',
          items: [
            'manual/threads',
            'manual/thread-prefixes',
            'manual/thread-fields',
            'manual/thread-prompts',
            'manual/thread-batch-update',
          ],
        },
        {
          type: 'category',
          label: 'Forum and thread types',
          items: [
            'manual/forum-thread-types',
            {
              type: 'category',
              label: 'Available types',
              items: [
                'manual/discussions',
                'manual/articles',
                'manual/questions',
                'manual/suggestions',
              ],
            },
            'manual/thread-type-tools',
          ],
        },
        'manual/thread-rss-importer',
      ],
    },
    {
      type: 'category',
      label: 'User-generated content',
      items: [
        'manual/content',
        'manual/bbcode',
        'manual/smilies',
        {
          type: 'category',
          label: 'Content attributes',
          items: [
            'manual/tags',
            'manual/reactions',
            'manual/content-voting',
          ],
        },
        {
          type: 'category',
          label: 'Content embeds',
          items: [
            'manual/attachments',
            'manual/bbcode-images',
            'manual/bbcode-media-sites',
            'manual/giphy',
          ],
        },
        'manual/censoring',
      ],
    },
    {
      type: 'category',
      label: 'Appearance and layout',
      items: [
        'manual/navigation',
        'manual/widgets',
        'manual/advertising',
        {
          type: 'category',
          label: 'Theming',
          items: [
            'manual/styles',
            'manual/style-properties',
            'manual/templates',
            'manual/template-modifications',
          ],
        },
        {
          type: 'category',
          label: 'User interface text',
          items: [
            'manual/languages',
            'manual/phrases',
          ],
        },
        'manual/bbcode-button-manager',
      ],
    },
    {
      type: 'category',
      label: 'Communication',
      items: [
        'manual/communication',
        'manual/notices',
        'manual/help',
        'manual/contact',
        'manual/activity-summary',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        {
          type: 'category',
          label: 'Options',
          items: [
            'manual/options',
            'manual/closing',
            'manual/captcha',
            'manual/email',
            'manual/friendly-urls',
            'manual/proxy',
            'manual/index-page',
            'manual/seo',
          ],
        },
        {
          type: 'category',
          label: 'Spam management',
          items: [
            'manual/spam',
            'manual/spam-cleaner',
          ],
        },
        {
          type: 'category',
          label: 'Connected accounts',
          items: [
            'manual/connected-accounts',
            {
              type: 'category',
              label: 'Configuring services',
              items: [
                'manual/connected-account-apple',
                'manual/connected-account-facebook',
                'manual/connected-account-google',
                'manual/connected-account-twitter',
                'manual/connected-account-github',
                'manual/connected-account-yahoo',
                'manual/connected-account-microsoft',
                'manual/connected-account-linkedin',
              ],
            },
          ],
        },
        'manual/pwa',
        'manual/add-ons',
        'manual/route-filters',
        'manual/payments',
        'manual/api-keys',
      ],
    },
    {
      type: 'category',
      label: 'Terms and rules',
      items: [
        'manual/terms',
      ],
    },
    'manual/tests',
    {
      type: 'category',
      label: 'Importing content',
      items: [
        'manual/importing',
        'manual/import-configuration',
        'manual/import-run',
        'manual/import-completion',
        'manual/import-redirection',
        {
          type: 'category',
          label: 'Importer notes',
          items: [
            'manual/import-notes-vbulletin',
          ],
        },
      ],
    },
    'manual/rebuild-caches',
    'manual/logs',
    {
      type: 'category',
      label: 'Server configuration',
      items: [
        'manual/config',
        'manual/unicode',
        'manual/cache',
      ],
    },
    {
      type: 'category',
      label: 'Official add-ons',
      items: [
        'manual/media-gallery',
        'manual/resource-manager',
        'manual/enhanced-search',
      ],
    },
  ],

  developersSidebar: [
    'devs/index',
    {
      type: 'category',
      label: 'Site Administrators',
      items: [
        'devs/template-syntax',
        'devs/rest-api',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      items: [
        'devs/add-on-structure',
        'devs/development-tools',
        'devs/general-concepts',
        'devs/routing-basics',
        'devs/controller-basics',
        'devs/entities-finders-repositories',
        'devs/criteria',
        'devs/managing-the-schema',
        'devs/lets-build-an-add-on',
      ],
    },
    {
      type: 'category',
      label: 'Designers',
      items: [
        'devs/designing-styles',
        {
          type: 'doc',
          id: 'devs/template-syntax',
          label: 'Template syntax',
        },
      ],
    },
    {
      type: 'category',
      label: 'Appendix',
      items: [
        'devs/macos-dev',
        'devs/linux-dev',
        'devs/windows-dev',
        'devs/vscode',
      ],
    },
  ],

  apiSidebar,
};

export default sidebars;
