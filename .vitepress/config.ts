import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'

const ogDescription = 'High Performance PHP Progressive Framework.'
const ogImage = 'https://queryphp.com/logo.png'
const ogTitle = 'QueryPHP'
const ogUrl = 'https://queryphp.com'

export default defineConfig({
  title: 'QueryPHP',
  description: 'High Performance PHP Progressive Framework.',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/here.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'CBDFBSLI',
        'data-spa': 'auto',
        defer: '',
      },
    ],
  ],

  vue: {
    reactivityTransform: true,
  },

  themeConfig: {
    logo: '/logo.png',

    editLink: {
      pattern: 'https://github.com/hunzhiwange/docs-cn/edit/main/:path',
      text: '为此页提供修改建议',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hunzhiwange/queryphp' },
    ],

    // algolia: {
    //   appId: '7H67QR5P0A',
    //   apiKey: 'deaab78bcdfe96b599497d25acc6460e',
    //   indexName: 'vitejs',
    //   searchParameters: {
    //     facetFilters: ['tags:cn']
    //   }
    // },

    // carbonAds: {
    //   code: 'CEBIEK3N',
    //   placement: 'vitejsdev',
    // },

    localeLinks: {
      text: 'English',
      items: [
        { text: '中文', link: 'https://cn.queryphp.com' },
      ],
    },

    footer: {
      copyright:
        'MIT Licensed | Copyright © 2010-present Xiangmin Liu'
    },

    nav: [
      {
        text: 'Docs',
        items: [
          {
            text: 'Preface',
            link: '/docs/'
          },
          {
            text: 'Started',
            link: '/docs/started/'
          },
          {
            text: 'Guide',
            link: '/docs/guide/'
          },
          {
            text: 'Architecture',
            link: '/docs/architecture/'
          },
          {
            text: 'Routing',
            link: '/docs/router/'
          },
          {
            text: 'Template',
            link: '/docs/template/'
          },
          {
            text: 'Database',
            link: '/docs/database/'
          },
          {
            text: 'ORM',
            link: '/docs/orm/'
          },
          {
            text: 'Validate',
            link: '/docs/validate/'
          },
          {
            text: 'Component',
            link: '/docs/component/support/str'
          },
          {
            text: 'Test',
            link: '/docs/test/'
          },
          {
            text: 'Developer',
            link: '/docs/developer/'
          },
        ],
      },
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'Community', link: '/ecosystem/', activeMatch: '/ecosystem/' },
      { text: 'About Us', link: '/about/', activeMatch: '/about/' },
      {
        text: '相关链接',
        items: [
          { text: 'Team', link: '/team' },
          {
            text: 'QueryPHP 社区',
            link: 'https://github.com/hunzhiwange/framework/discussions'
          },
          {
            text: 'CHANGELOG',
            link: 'https://github.com/hunzhiwange/queryphp/blob/master/assets/changelog/CHANGELOG.md'
          }
        ]
      },
    ],

    sidebar: {
      //'/guide/': genSidebarConfig('Guide'),
      '/docs/started/': genSidebarConfigStartedDoc('Started'),
      // '/docs/guide/': genSidebarConfigGuideDoc('Guide'),
      '/docs/architecture/': genSidebarConfigArchitectureDoc('Architecture', 'Kernel'),
      // '/docs/router/': genSidebarConfigRouterDoc('Routing'),
      '/docs/template/': genSidebarConfigTemplateDoc('Template'),
      // '/docs/database/': genSidebarConfigDatabaseDoc('Database', 'Add', 'Delete', 'Update', 'Query', 'Query lang'),
      // '/docs/orm/': genSidebarConfigOrmDoc('ORM'),
      // '/docs/validate/': genSidebarConfigValidateDoc('Validate'),
      // '/docs/component/': genSidebarConfigComponentDoc('Component', 'Encryption', 'Option', 'Cache', 'Auth', 'Filesystem', 'Console'),
      // '/docs/test/': genSidebarConfigTestDoc('Test'),
      // '/docs/developer/': genSidebarConfigDeveloperDoc('Developer'),
      // '/guide/': genSidebarConfigGuideDoc('Guide'),
      // '/config/': [
      //   {
      //     text: '配置',
      //     items: [
      //       {
      //         text: '配置 Vite',
      //         link: '/config/'
      //       },
      //       {
      //         text: '共享选项',
      //         link: '/config/shared-options'
      //       },
      //       {
      //         text: '服务器选项',
      //         link: '/config/server-options'
      //       },
      //       {
      //         text: '构建选项',
      //         link: '/config/build-options'
      //       },
      //       {
      //         text: '预览选项',
      //         link: '/config/preview-options'
      //       },
      //       {
      //         text: '依赖优化选项',
      //         link: '/config/dep-optimization-options'
      //       },
      //       {
      //         text: 'SSR 选项',
      //         link: '/config/ssr-options'
      //       },
      //       {
      //         text: 'Worker 选项',
      //         link: '/config/worker-options'
      //       }
      //     ]
      //   }
      // ]
    }
  },

  markdown: {
    anchor: {
      permalink: renderPermaLink
    },
    config: (md) => {
      md.use(MarkDownItCustomAnchor)
    }
  }
})

function genSidebarConfigGuideDoc (groupA) {
  return [
    {
      text: groupA,
      items: []
    }
  ]
}

function genSidebarConfig (groupA) {
  return [
    {
      title: groupA,
      items: []
    }
  ]
}

function genSidebarConfigStartedDoc (groupA) {
  return [
    {
      title: groupA,
      items: [
        {
          text: 'Summary',
          link: '/docs/started/'
        },
        {
          text: 'Install',
          link: '/docs/started/install'
        },
        {
          text: 'Specification',
          link: '/docs/started/specification'
        },
        {
          text: 'Directory',
          link: '/docs/started/directory'
        },
        {
          text: 'Namespace',
          link: '/docs/started/namespace'
        },
      ]
    }
  ]
}

function genSidebarConfigArchitectureDoc (groupA, groupB) {
  return [
    {
      title: groupA,
      items: [
        {
          text: 'Summary',
          link: '/docs/architecture/'
        },
        {
          text: 'IOC 容器',
          link: '/docs/architecture/ioc'
        },
        {
          text: '服务提供者',
          link: '/docs/architecture/provider'
        },
        {
          text: '事件',
          link: '/docs/architecture/event'
        },
        {
          text: '内核',
          link: '/docs/architecture/kernel'
        },
        {
          title: groupB,
          collapsable: true,
          'children': [
            'kernel',
            'kernel/kernelconsole',
            'kernel/app',
            'kernel/functions',
            'kernel/bootstrap/loadoption',
            'kernel/bootstrap/loadi18n',
            'kernel/bootstrap/registerexceptionruntime',
            'kernel/bootstrap/traverseprovider',
          ],
        },
      ]
    }
  ]
}

function genSidebarConfigRouterDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'router',
        'url',
        'response',
        'annotation',
        'provider',
      ]
    }
  ]
}

function genSidebarConfigTemplateDoc (groupA) {
  return [
    {
      title: groupA,
      items: [
        {
          text: '变量',
          link: '/docs/template/var'
        },
        {
          text: '快捷标签',
          link: '/docs/template/quick'
        },
        {
          text: '流程控制',
          link: '/docs/template/if'
        },
        {
          text: 'For 循环',
          link: '/docs/template/for'
        },
        {
          text: 'Foreach 循环',
          link: '/docs/template/foreach'
        },
        {
          text: 'Foreach 增强循环',
          link: '/docs/template/foreachplus'
        },
        {
          text: 'While 循环',
          link: '/docs/template/while'
        },
        {
          text: '跳出循环',
          link: '/docs/template/break'
        },
        {
          text: 'Include 标签',
          link: '/docs/template/include'
        },
        {
          text: 'Tagself 保护标签',
          link: '/docs/template/tagself'
        },
      ]
    }
  ]
}

function genSidebarConfigDatabaseDoc (groupA, groupB, groupC, groupD, groupE, groupF) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'config',
        'database',
        'select',
        {
          title: groupB + ' Create',
          collapsable: false,
          'children': [
            'create/insert',
            'create/insertall',
          ],
        },
        {
          title: groupC + ' Delete',
          collapsable: false,
          'children': [
            'delete/delete',
            'delete/truncate',
          ],
        },
        {
          title: groupD + ' Update',
          collapsable: false,
          'children': [
            'update/update',
            'update/updatecolumn',
            'update/updateincrease',
            'update/updatedecrease',
          ],
        },
        {
          title: groupE + ' Read',
          collapsable: false,
          'children': [
            'read/aggregate',
            'read/find',
            'read/findall',
            'read/findone',
            'read/finddynamics',
            'read/select',
            'read/list',
            'read/value',
          ],
        },
        {
          title: groupF,
          collapsable: false,
          'children': [
            'query/flow',
            'query/sql',
            'query/table',
            'query/columns',
            'query/where',
            'query/wheredate',
            'query/comment',
            'query/prefix',
            'query/forceindex',
            'query/bind',
            'query/join',
            'query/union',
            'query/orderby',
            'query/groupby',
            'query/having',
            'query/havingdate',
            'query/distinct',
            'query/aggregate',
            'query/limit',
            'query/forupdate',
            'query/reset',
          ],
        },
      ]
    }
  ]
}

function genSidebarConfigOrmDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'entity',
        'define',
        'toarray',
        'conversion',
        'create',
        'update',
        'replace',
        'delete',
        'event',
        'relation',
        'belongsto',
        'hasmany',
        'hasone',
        'manymany',
        'nested',
        'select',
        'unitofwork',
        'repository',
      ]
    }
  ]
}

function genSidebarConfigValidateDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      'children': [
        '',
        'assert',
        'helper',
        'validator/accepted',
        'validator/after',
        'validator/allowedip',
        'validator/alpha',
        'validator/alphadash',
        'validator/alphalower',
        'validator/alphanum',
        'validator/alphaupper',
        'validator/isarray',
        'validator/before',
        'validator/between',
        'validator/betweenequal',
        'validator/boolean',
        'validator/chinese',
        'validator/chinesealphadash',
        'validator/chinesealphanum',
        'validator/date',
        'validator/dateformat',
        'validator/denyip',
        'validator/different',
        'validator/digit',
        'validator/double',
        'validator/email',
        'validator/isempty',
        'validator/equal',
        'validator/equalgreaterthan',
        'validator/equallessthan',
        'validator/equalto',
        'validator/isfloat',
        'validator/greaterthan',
        'validator/idcard',
        'validator/in',
        'validator/integer',
        'validator/ip',
        'validator/ipv4',
        'validator/ipv6',
        'validator/json',
        'validator/lessthan',
        'validator/lower',
        'validator/luhn',
        'validator/max',
        'validator/maxlength',
        'validator/min',
        'validator/minlength',
        'validator/mobile',
        'validator/notbetween',
        'validator/notbetweenequal',
        'validator/notempty',
        'validator/notequal',
        'validator/notin',
        'validator/notnull',
        'validator/notsame',
        'validator/isnull',
        'validator/number',
        'validator/phone',
        'validator/qq',
        'validator/regex',
        'validator/required',
        'validator/same',
        'validator/strlen',
        'validator/telephone',
        'validator/timezone',
        'validator/type',
        'validator/unique',
        'validator/upper',
        'validator/url',
        'validator/zipcode',
      ]
    }
  ]
}

function genSidebarConfigComponentDoc (groupA, groupB, groupC, groupD, groupE, groupF, groupG) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        'support/str',
        'support/arr',
        'support/type',
        'support/dto',
        'support/enum',
        {
          title: 'Collection',
          collapsable: false,
          'children': [
            'collection',
            'collection/typedassociative',
            'collection/typedint',
            'collection/typedstring',
          ],
        },
        'tree',
        'pipeline',
        'flow',
        'linkedlist',
        'queue',
        'stack',
        {
          title: groupB,
          collapsable: false,
          'children': [
            'encryption',
            'encryption/helper',
          ],
        },
        {
          title: groupC,
          collapsable: false,
          'children': [
            'option',
            'option/composer',
          ],
        },
        {
          title: groupD,
          collapsable: false,
          'children': [
            'cache',
          ],
        },
        'session',
        'page',
        'debug',
        'log',
        {
          title: 'HTTP',
          collapsable: false,
          'children': [
            'http/',
            'http/request',
            'http/response',
            'http/jsonresponse',
            'http/redirectresponse',
          ],
        },
        'cache',
        {
          title: groupF,
          collapsable: false,
          'children': [
            'filesystem',
            'filesystem/helper',
          ],
        },
        {
          title: groupG,
          collapsable: false,
          'children': [
            'console',
            'console/makecommand',
            'console/runcommand',
          ],
        },
        'view',
      ]
    }
  ]
}

function genSidebarConfigTestDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}

function genSidebarConfigDeveloperDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
