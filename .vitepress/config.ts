import { defineConfig } from 'vitepress'

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
    ['meta', { name: 'theme-color', content: '#646cff' }],
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

    search: {
      provider: 'local'
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
      '/docs/started/': genSidebarConfigStartedDoc('Started'),
      '/docs/architecture/': genSidebarConfigArchitectureDoc('Architecture', 'Kernel'),
      '/docs/router/': genSidebarConfigRouterDoc('Routing'),
      '/docs/template/': genSidebarConfigTemplateDoc('Template'),
      '/docs/database/': genSidebarConfigDatabaseDoc('Database', 'Add', 'Delete', 'Update', 'Query', 'Query lang'),
      '/docs/orm/': genSidebarConfigOrmDoc('ORM'),
      '/docs/validate/': genSidebarConfigValidateDoc('Validate'),
      '/docs/component/': genSidebarConfigComponentDoc('Component', 'Encryption', 'Option', 'Cache', 'Auth', 'Filesystem', 'Console'),
    }
  },
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
          text: 'Manager',
          link: '/docs/architecture/manager'
        },
        {
          text: '内核',
          link: '/docs/architecture/kernel'
        },
        {
          title: groupB,
          items: [
            {
              text: '命令行内核',
              link: '/docs/architecture/kernel/kernelconsole'
            },
            {
              text: '应用',
              link: '/docs/architecture/kernel/app'
            },
            {
              text: '内核助手函数',
              link: '/docs/architecture/kernel/functions'
            },
            {
              text: '初始化载入配置',
              link: '/docs/architecture/kernel/bootstrap/loadoption'
            },
            {
              text: '初始化载入语言包',
              link: '/docs/architecture/kernel/bootstrap/loadi18n'
            },
            {
              text: '初始化注册异常运行时',
              link: '/docs/architecture/kernel/bootstrap/registerexceptionruntime'
            },
            {
              text: '初始化遍历服务提供者注册服务',
              link: '/docs/architecture/kernel/bootstrap/traverseprovider'
            },
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
      items: [
        {
          text: '路由',
          link: '/docs/router/'
        },
        {
          text: 'Router',
          link: '/docs/router/router'
        },
        {
          text: 'url',
          link: '/docs/router/url'
        },
        {
          text: 'response',
          link: '/docs/router/response'
        },
        {
          text: 'annotation',
          link: '/docs/router/annotation'
        },
        {
          text: 'provider',
          link: '/docs/router/provider'
        },
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
          text: '模板',
          link: '/docs/template/'
        },
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
      text: groupA,
      link: '/docs/database/',
      items: [
        {
          text: 'config',
          link: '/docs/database/config',
        },
        {
          text: 'select',
          link: '/docs/database/select',
        },
        {
          text: 'database',
          link: '/docs/database/database',
        },
        {
          text: groupB + ' Create',
          items: [
            {
              text: 'insert',
              link: '/docs/database/create/insert',
            },
            {
              text: 'insertall',
              link: '/docs/database/create/insertall',
            },
          ],
        },
        {
          text: groupC + ' Delete',
          items: [
            {
              text: 'delete',
              link: '/docs/database/delete/delete',
            },
            {
              text: 'truncate',
              link: '/docs/database/delete/truncate',
            },
          ],
        },
        {
          text: groupD + ' Update',
          items: [
            {
              text: 'update',
              link: '/docs/database/update/update',
            },
            {
              text: 'updatecolumn',
              link: '/docs/database/update/updatecolumn',
            },
            {
              text: 'updateincrease',
              link: '/docs/database/update/updateincrease',
            },
            {
              text: 'updatedecrease',
              link: '/docs/database/update/updatedecrease',
            },
          ],
        },
        {
          text: groupE + ' Read',
          items: [
            {
              text: 'aggregate',
              link: '/docs/database/read/aggregate',
            },
            {
              text: 'find',
              link: '/docs/database/read/find',
            },
            {
              text: 'findall',
              link: '/docs/database/read/findall',
            },
            {
              text: 'findone',
              link: '/docs/database/read/findone',
            },
            {
              text: 'finddynamics',
              link: '/docs/database/read/finddynamics',
            },
            {
              text: 'select',
              link: '/docs/database/read/select',
            },
            {
              text: 'list',
              link: '/docs/database/read/list',
            },
            {
              text: 'value',
              link: '/docs/database/read/value',
            },
          ],
        },
        {
          text: groupF,
          items: [
            {
              text: 'flow',
              link: '/docs/database/query/flow',
            },
            {
              text: 'table',
              link: '/docs/database/query/table',
            },
            {
              text: 'columns',
              link: '/docs/database/query/columns',
            },
            {
              text: 'where',
              link: '/docs/database/query/where',
            },
            {
              text: 'wheredate',
              link: '/docs/database/query/wheredate',
            },
            {
              text: 'comment',
              link: '/docs/database/query/comment',
            },
            {
              text: 'middleware',
              link: '/docs/database/query/middleware',
            },
            {
              text: 'prefix',
              link: '/docs/database/query/prefix',
            },
            {
              text: 'forceindex',
              link: '/docs/database/query/forceindex',
            },
            {
              text: 'bind',
              link: '/docs/database/query/bind',
            },
            {
              text: 'join',
              link: '/docs/database/query/join',
            },
            {
              text: 'union',
              link: '/docs/database/query/union',
            },
            {
              text: 'orderby',
              link: '/docs/database/query/orderby',
            },
            {
              text: 'groupby',
              link: '/docs/database/query/groupby',
            },
            {
              text: 'having',
              link: '/docs/database/query/having',
            },
            {
              text: 'havingdate',
              link: '/docs/database/query/havingdate',
            },
            {
              text: 'distinct',
              link: '/docs/database/query/distinct',
            },
            {
              text: 'aggregate',
              link: '/docs/database/query/aggregate',
            },
            {
              text: 'limit',
              link: '/docs/database/query/limit',
            },
            {
              text: 'forupdate',
              link: '/docs/database/query/forupdate',
            },
            {
              text: 'reset',
              link: '/docs/database/query/reset',
            },
          ],
        },
      ]
    }
  ]
}

function genSidebarConfigOrmDoc (groupA) {
  return [
      {
        text: 'ORM',
        link: '/docs/orm/',
        items: [
          {
            text: '实体',
            link: '/docs/orm/entity'
          },
          {
            text: 'define',
            link: '/docs/orm/define'
          },
          {
            text: 'toarray',
            link: '/docs/orm/toarray'
          },
          {
            text: 'conversion',
            link: '/docs/orm/conversion'
          },
          {
            text: 'create',
            link: '/docs/orm/create'
          },
          {
            text: 'update',
            link: '/docs/orm/update'
          },
          {
            text: 'replace',
            link: '/docs/orm/replace'
          },
          {
            text: 'delete',
            link: '/docs/orm/delete'
          },
          {
            text: 'event',
            link: '/docs/orm/event'
          },
          {
            text: 'relation',
            link: '/docs/orm/relation'
          },
          {
            text: 'belongsto',
            link: '/docs/orm/belongsto'
          },
          {
            text: 'hasmany',
            link: '/docs/orm/hasmany'
          },
          {
            text: 'hasone',
            link: '/docs/orm/hasone'
          },
          {
            text: 'manymany',
            link: '/docs/orm/manymany'
          },
          {
            text: 'nested',
            link: '/docs/orm/nested'
          },
          {
            text: 'select',
            link: '/docs/orm/select'
          },
          {
            text: 'unitofwork',
            link: '/docs/orm/unitofwork'
          },
          {
            text: 'repository',
            link: '/docs/orm/repository'
          },
        ]
      },
  ]
}

function genSidebarConfigValidateDoc (groupA) {
  return [
    {
      text: groupA,
      link: '/docs/validate/',
      items: [
        {
          text: 'assert',
          link: '/docs/validate/assert'
        },
        {
          text: 'helper',
          link: '/docs/validate/helper'
        },
        {
          text: 'accepted',
          link: '/docs/validate/validator/accepted'
        },
        {
          text: 'after',
          link: '/docs/validate/validator/after'
        },
        {
          text: 'allowedip',
          link: '/docs/validate/validator/allowedip'
        },
        {
          text: 'isarray',
          link: '/docs/validate/validator/isarray'
        },
        {
          text: 'alphaupper',
          link: '/docs/validate/validator/alphaupper'
        },
        {
          text: 'alphalower',
          link: '/docs/validate/validator/alphalower'
        },
        {
          text: 'alphanum',
          link: '/docs/validate/validator/alphanum'
        },
        {
          text: 'alphaupper',
          link: '/docs/validate/validator/alphaupper'
        },
        {
          text: 'isarray',
          link: '/docs/validate/validator/isarray'
        },
        {
          text: 'before',
          link: '/docs/validate/validator/before'
        },
        {
          text: 'between',
          link: '/docs/validate/validator/between'
        },
        {
          text: 'betweenequal',
          link: '/docs/validate/validator/betweenequal'
        },
        {
          text: 'boolean',
          link: '/docs/validate/validator/boolean'
        },
        {
          text: 'chinese',
          link: '/docs/validate/validator/chinese'
        },
        {
          text: 'chinesealphadash',
          link: '/docs/validate/validator/chinesealphadash'
        },
        {
          text: 'chinesealphanum',
          link: '/docs/validate/validator/chinesealphanum'
        },
        {
          text: 'date',
          link: '/docs/validate/validator/date'
        },
        {
          text: 'dateformat',
          link: '/docs/validate/validator/dateformat'
        },
        {
          text: 'denyip',
          link: '/docs/validate/validator/denyip'
        },
        {
          text: 'different',
          link: '/docs/validate/validator/different'
        },
        {
          text: 'digit',
          link: '/docs/validate/validator/digit'
        },
        {
          text: 'double',
          link: '/docs/validate/validator/double'
        },
        {
          text: 'email',
          link: '/docs/validate/validator/email'
        },
        {
          text: 'isempty',
          link: '/docs/validate/validator/isempty'
        },
        {
          text: 'equal',
          link: '/docs/validate/validator/equal'
        },
        {
          text: 'equalgreaterthan',
          link: '/docs/validate/validator/equalgreaterthan'
        },
        {
          text: 'equallessthan',
          link: '/docs/validate/validator/equallessthan'
        },
        {
          text: 'equalto',
          link: '/docs/validate/validator/equalto'
        },
        {
          text: 'isfloat',
          link: '/docs/validate/validator/isfloat'
        },
        {
          text: 'greaterthan',
          link: '/docs/validate/validator/greaterthan'
        },
        {
          text: 'idcard',
          link: '/docs/validate/validator/idcard'
        },
        {
          text: 'in',
          link: '/docs/validate/validator/in'
        },
        {
          text: 'integer',
          link: '/docs/validate/validator/integer'
        },
        {
          text: 'ip',
          link: '/docs/validate/validator/ip'
        },
        {
          text: 'ipv4',
          link: '/docs/validate/validator/ipv4'
        },
        {
          text: 'ipv6',
          link: '/docs/validate/validator/ipv6'
        },
        {
          text: 'json',
          link: '/docs/validate/validator/json'
        },
        {
          text: 'lessthan',
          link: '/docs/validate/validator/lessthan'
        },
        {
          text: 'lower',
          link: '/docs/validate/validator/lower'
        },
        {
          text: 'luhn',
          link: '/docs/validate/validator/luhn'
        },
        {
          text: 'max',
          link: '/docs/validate/validator/max'
        },
        {
          text: 'maxlength',
          link: '/docs/validate/validator/maxlength'
        },
        {
          text: 'min',
          link: '/docs/validate/validator/min'
        },
        {
          text: 'minlength',
          link: '/docs/validate/validator/minlength'
        },
        {
          text: 'mobile',
          link: '/docs/validate/validator/mobile'
        },
        {
          text: 'notbetween',
          link: '/docs/validate/validator/notbetween'
        },
        {
          text: 'notbetweenequal',
          link: '/docs/validate/validator/notbetweenequal'
        },
        {
          text: 'notempty',
          link: '/docs/validate/validator/notempty'
        },
        {
          text: 'notequal',
          link: '/docs/validate/validator/notequal'
        },
        {
          text: 'notin',
          link: '/docs/validate/validator/notin'
        },
        {
          text: 'notnull',
          link: '/docs/validate/validator/notnull'
        },
        {
          text: 'notsame',
          link: '/docs/validate/validator/notsame'
        },
        {
          text: 'isnull',
          link: '/docs/validate/validator/isnull'
        },
        {
          text: 'number',
          link: '/docs/validate/validator/number'
        },
        {
          text: 'phone',
          link: '/docs/validate/validator/phone'
        },
        {
          text: 'qq',
          link: '/docs/validate/validator/qq'
        },
        {
          text: 'regex',
          link: '/docs/validate/validator/regex'
        },
        {
          text: 'required',
          link: '/docs/validate/validator/required'
        },
        {
          text: 'same',
          link: '/docs/validate/validator/same'
        },
        {
          text: 'strlen',
          link: '/docs/validate/validator/strlen'
        },
        {
          text: 'telephone',
          link: '/docs/validate/validator/telephone'
        },
        {
          text: 'timezone',
          link: '/docs/validate/validator/timezone'
        },
        {
          text: 'type',
          link: '/docs/validate/validator/type'
        },
        {
          text: 'unique',
          link: '/docs/validate/validator/unique'
        },
        {
          text: 'upper',
          link: '/docs/validate/validator/upper'
        },
        {
          text: 'url',
          link: '/docs/validate/validator/url'
        },
        {
          text: 'zipcode',
          link: '/docs/validate/validator/zipcode'
        },
      ]
    }
  ]
}

function genSidebarConfigComponentDoc (groupA, groupB, groupC, groupD, groupE, groupF, groupG) {
  return [
    {
      title: groupA,
      items: [
        {
          text: 'str',
          link: '/docs/component/support/str'
        },
        {
          text: 'arr',
          link: '/docs/component/support/arr'
        },
        {
          text: 'type',
          link: '/docs/component/support/type'
        },
        {
          text: 'dto',
          link: '/docs/component/support/dto'
        },
        {
          text: 'enum',
          link: '/docs/component/support/enum'
        },
        {
          text: 'collection',
          link: '/docs/component/collection',
          items: [
            {
              text: 'typedassociative',
              link: '/docs/component/collection/typedassociative'
            },
            {
              text: 'typedstring',
              link: '/docs/component/collection/typedstring'
            },
            {
              text: 'typedint',
              link: '/docs/component/collection/typedint'
            },
          ],
        },
        {
          text: 'tree',
          link: '/docs/component/tree'
        },
        {
          text: 'pipeline',
          link: '/docs/component/pipeline'
        },
        {
          text: 'flow',
          link: '/docs/component/flow'
        },
        {
          text: 'linkedlist',
          link: '/docs/component/linkedlist'
        },
        {
          text: 'queue',
          link: '/docs/component/queue'
        },
        {
          text: 'stack',
          link: '/docs/component/stack'
        },
        {
          text: 'encryption',
          link: '/docs/component/encryption',
          items: [
            {
              text: 'encryption helper',
              link: '/docs/component/encryption/helper'
            },
          ],
        },
        {
          text: groupC,
          link: '/docs/component/option',
          items: [
            {
              text: 'option composer',
              link: '/docs/component/option/composer'
            },
          ],
        },
        {
          text: 'cache',
          link: '/docs/component/cache'
        },
        {
          text: 'session',
          link: '/docs/component/session'
        },
        {
          text: 'page',
          link: '/docs/component/page'
        },
        {
          text: 'debug',
          link: '/docs/component/debug'
        },
        {
          text: 'log',
          link: '/docs/component/log'
        },
        {
          text: 'HTTP',
          link: '/docs/component/http/',
          items: [
            {
              text: 'request',
              link: '/docs/component/http/request'
            },
            {
              text: 'response',
              link: '/docs/component/http/response'
            },
            {
              text: 'jsonresponse',
              link: '/docs/component/http/jsonresponse'
            },
            {
              text: 'redirectresponse',
              link: '/docs/component/http/redirectresponse'
            },
          ],
        },
        {
          text: groupF,
          link: '/docs/component/filesystem',
          items: [
            {
              text: 'helper',
              link: '/docs/component/filesystem/helper'
            },
          ],
        },
        {
          text: groupG,
          link: '/docs/component/console',
          items: [
            {
              text: 'makecommand',
              link: '/docs/component/console/makecommand'
            },
            {
              text: 'runcommand',
              link: '/docs/component/console/runcommand'
            },
          ],
        },
        {
          text: 'view',
          link: '/docs/component/view'
        },
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
