import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import apiSidebar from './docs/api/sidebar';

const sidebars: SidebarsConfig = {
    manualSidebar: [
        'manual/index',
        {
            'Installing and upgrading': [
                'manual/installing-and-upgrading/install-upgrade',
                'manual/installing-and-upgrading/install',
                'manual/installing-and-upgrading/upgrade',
            ],
        },
        {
            type: 'category',
            label: 'Common concepts',
            link: {type: 'doc', id: 'manual/common-concepts/index'},
            items: [
                'manual/common-concepts/display-order',
                'manual/common-concepts/criteria',
                'manual/common-concepts/filter',
                'manual/common-concepts/cron',
            ],
        },
        {
            type: 'category',
            label: 'Users',
            link: {type: 'doc', id: 'manual/users/index'},
            items: [
                'manual/users/user-security',
                'manual/users/user-profile',
                'manual/users/user-fields',
                {
                    type: 'category',
                    label: 'Paid user upgrades',
                    items: [
                        'manual/users/user-upgrades',
                        {
                            type: 'category',
                            label: 'User upgrade examples',
                            items: [
                                'manual/users/user-upgrade-premium-forum',
                                'manual/users/user-upgrade-profile-banners',
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Gamification',
                    items: [
                        'manual/users/user-trophies',
                        'manual/users/user-title-ladder',
                    ],
                },
                {
                    type: 'category',
                    label: 'Discipline',
                    items: [
                        'manual/users/warnings',
                        'manual/users/banning',
                        'manual/users/discouragement',
                    ],
                },
                'manual/users/user-name-change',
                'manual/users/member-stats',
                'manual/users/user-batch-update',
            ],
        },
        {
            type: 'category',
            label: 'Access privileges',
            link: {type: 'doc', id: 'manual/access-privileges/index'},
            items: [
                'manual/access-privileges/groups-permissions',
                'manual/access-privileges/permissions',
                {
                    type: 'category',
                    label: 'Promotions',
                    items: [
                        'manual/access-privileges/promotions',
                        {
                            type: 'category',
                            label: 'Promotion examples',
                            items: [
                                'manual/access-privileges/promotion-new-users',
                                'manual/access-privileges/promotion-birthday',
                            ],
                        },
                    ],
                },
                'manual/access-privileges/staff',
            ],
        },
        {
            type: 'category',
            label: 'Forums, threads and posts',
            link: {type: 'doc', id: 'manual/forums/index'},
            items: [
                'manual/forums/nodes-forums',
                {
                    type: 'category',
                    label: 'Threads',
                    items: [
                        'manual/forums/threads',
                        'manual/forums/thread-prefixes',
                        'manual/forums/thread-fields',
                        'manual/forums/thread-prompts',
                        'manual/forums/thread-batch-update',
                    ],
                },
                {
                    type: 'category',
                    label: 'Forum and thread types',
                    items: [
                        'manual/forums/forum-thread-types',
                        {
                            type: 'category',
                            label: 'Available types',
                            items: [
                                'manual/forums/discussions',
                                'manual/forums/articles',
                                'manual/forums/questions',
                                'manual/forums/suggestions',
                            ],
                        },
                        'manual/forums/thread-type-tools',
                    ],
                },
                'manual/forums/thread-rss-importer',
            ],
        },
        {
            type: 'category',
            label: 'User-generated content',
            link: {type: 'doc', id: 'manual/content/index'},
            items: [
                'manual/content/overview',
                'manual/content/bbcode',
                'manual/content/smilies',
                {
                    type: 'category',
                    label: 'Content attributes',
                    items: [
                        'manual/content/tags',
                        'manual/content/reactions',
                        'manual/content/content-voting',
                    ],
                },
                {
                    type: 'category',
                    label: 'Content embeds',
                    items: [
                        'manual/content/attachments',
                        'manual/content/bbcode-images',
                        'manual/content/bbcode-media-sites',
                        'manual/content/giphy',
                    ],
                },
                'manual/content/censoring',
            ],
        },
        {
            type: 'category',
            label: 'Appearance and layout',
            link: {type: 'doc', id: 'manual/appearance/index'},
            items: [
                'manual/appearance/navigation',
                'manual/appearance/widgets',
                'manual/appearance/advertising',
                {
                    type: 'category',
                    label: 'Theming',
                    items: [
                        'manual/appearance/styles',
                        'manual/appearance/style-properties',
                        'manual/appearance/templates',
                        'manual/appearance/template-modifications',
                    ],
                },
                {
                    type: 'category',
                    label: 'User interface text',
                    items: [
                        'manual/appearance/languages',
                        'manual/appearance/phrases',
                    ],
                },
                'manual/appearance/bbcode-button-manager',
            ],
        },
        {
            type: 'category',
            label: 'Communication',
            link: {type: 'doc', id: 'manual/communication/index'},
            items: [
                'manual/communication/overview',
                'manual/communication/notices',
                'manual/communication/help',
                'manual/communication/contact',
                'manual/communication/activity-summary',
            ],
        },
        {
            type: 'category',
            label: 'Configuration',
            link: {type: 'doc', id: 'manual/configuration/index'},
            items: [
                {
                    type: 'category',
                    label: 'Options',
                    items: [
                        'manual/configuration/options',
                        'manual/configuration/closing',
                        'manual/configuration/captcha',
                        'manual/configuration/email',
                        'manual/configuration/friendly-urls',
                        'manual/configuration/proxy',
                        'manual/configuration/index-page',
                        'manual/configuration/seo',
                    ],
                },
                {
                    type: 'category',
                    label: 'Spam management',
                    link: {type: 'doc', id: 'manual/configuration/spam/index'},
                    items: [
                        'manual/configuration/spam/spam-cleaner',
                    ],
                },
                {
                    type: 'category',
                    label: 'Connected accounts',
                    link: {type: 'doc', id: 'manual/configuration/connected-accounts/index'},
                    items: [
                        'manual/configuration/connected-accounts/apple',
                        'manual/configuration/connected-accounts/facebook',
                        'manual/configuration/connected-accounts/google',
                        'manual/configuration/connected-accounts/twitter',
                        'manual/configuration/connected-accounts/github',
                        'manual/configuration/connected-accounts/yahoo',
                        'manual/configuration/connected-accounts/microsoft',
                        'manual/configuration/connected-accounts/linkedin',
                    ],
                },
                'manual/configuration/pwa',
                'manual/configuration/add-ons',
                'manual/configuration/route-filters',
                'manual/configuration/payments',
                'manual/configuration/api-keys',
            ],
        },
        {
            type: 'category',
            label: 'Terms and rules',
            link: {type: 'doc', id: 'manual/terms-rules/index'},
            items: [
                'manual/terms-rules/terms',
            ],
        },
        {
            type: 'category',
            label: 'Importing content',
            link: {type: 'doc', id: 'manual/importing/index'},
            items: [
                'manual/importing/overview',
                'manual/importing/import-configuration',
                'manual/importing/import-run',
                'manual/importing/import-completion',
                'manual/importing/import-redirection',
                {
                    type: 'category',
                    label: 'Importer notes',
                    items: [
                        'manual/importing/import-notes-vbulletin',
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'Maintenance',
            link: {type: 'doc', id: 'manual/maintenance/index'},
            items: [
                'manual/maintenance/rebuild-caches',
                'manual/maintenance/logs',
                'manual/maintenance/tests',
            ],
        },
        {
            type: 'category',
            label: 'Server configuration',
            link: {type: 'doc', id: 'manual/config/index'},
            items: [
                'manual/config/config-php',
                'manual/config/unicode',
                'manual/config/cache',
            ],
        },
        {
            type: 'category',
            label: 'Reference',
            link: {type: 'doc', id: 'manual/reference/index'},
            items: [
                'manual/reference/template-syntax',
                'manual/reference/rest-api',
            ],
        },
        {
            type: 'category',
            label: 'Official add-ons',
            link: {type: 'doc', id: 'manual/official-addons/index'},
            items: [
                'manual/official-addons/media-gallery',
                'manual/official-addons/resource-manager',
                'manual/official-addons/enhanced-search',
            ],
        },
    ],

    developersSidebar: [
        'devs/index',
        'devs/add-on-structure',
        'devs/development-tools',
        'devs/general-concepts',
        'devs/template-basics',
        'devs/routing-basics',
        'devs/controller-basics',
        'devs/entities-finders-repositories',
        'devs/criteria',
        'devs/managing-the-schema',
        'devs/lets-build-an-add-on',
        {
            type: 'category',
            label: 'Appendix',
            items: [
                'devs/appendix/macos-dev',
                'devs/appendix/linux-dev',
                'devs/appendix/windows-dev',
                'devs/appendix/vscode',
            ],
        },
    ],

    apiSidebar,
};

export default sidebars;
