export const datas = [
  {
    "path": "/admin/menus",
    "component": "layout/Layout",
    "redirect": "noredirect",
    "name": "menus",
    "hidden": false,
    "meta": {
      "title": "项目菜单管理",
      "noCache": false,
      "icon": "language"
    },
    "children": [
      {
        "path": "/menus/index",
        "component": "views/menus/index",
        "name": "menus/index",
        "hidden": false,
        "meta": {
          "title": "菜单列表",
          "noCache": false,
          // "icon": "nested"
        },  
      },
    ]
  },
  {
    "path": "/admin/menu",
    "component": "layout/Layout",
    "redirect": "noredirect",
    "name": "menu",
    "hidden": false,
    "meta": {
      "title": "组件",
      "noCache": false,
      "icon": "component"
    },
    "children": [
      {
        "path": "/menu/index",
        "component": "views/menu/index",
        "name": "menu/index",
        "hidden": false,
        "meta": {
          "title": "弹窗+表单",
          "noCache": false,
          // "icon": "nested"
        },  
      },
      {
        "path": "/menu/table",
        "component": "views/menu/table",
        "name": "/menu/table",
        "hidden": false,
        "meta": {
          "title": "表格+分页",
          "noCache": false,
          // "icon": "nested"
        },
      
      },
      {
        "path": "/menu/picture",
        "component": "views/menu/picture",
        "name": "/menu/picture",
        "hidden": false,
        "meta": {
          "title": "头像+照片墙上传",
          "noCache": false,
          // "icon": "nested"
        },
      
      },
      {
        "path": "/menu/tables",
        "component": "views/menu/tables",
        "name": "/menu/tables",
        "hidden": false,
        "meta": {
          "title": "tables",
          "noCache": false,
          // "icon": "nested"
        },
      
      },
      {
        "path": "/menu/pop_up",
        "component": "views/menu/pop_up",
        "name": "/menu/pop_up",
        "hidden": false,
        "meta": {
          "title": "pop_up",
          "noCache": false,
          // "icon": "nested"
        },
      
      },
      {
        "path": "/menu/tabulation",
        "component": "views/menu/tabulation",
        "name": "/menu/tabulation",
        "hidden": false,
        "meta": {
          "title": "动态表",
          "noCache": false,
          // "icon": "nested"
        },
      },
      {
        "path": "/menu/richtext",
        "component": "views/menu/richtext",
        "name": "/menu/richtext",
        "hidden": false,
        "meta": {
          "title": "富文本",
          "noCache": false,
          // "icon": "nested"
        },
      },
      {
        "path": "/menu/sticky",
        "component": "views/menu/sticky",
        "name": "/menu/sticky",
        "hidden": false,
        "meta": {
          "title": "固定定位",
          "noCache": false,
          // "icon": "nested"
        },
      },
      {
        "path": "/menu/count-to",
        "component": "views/menu/count-to",
        "name": "/menu/count-to",
        "hidden": false,
        "meta": {
          "title": "数字滚动",
          "noCache": false,
          // "icon": "nested"
        },
      },
      {
        "path": "/menu/back-to-top",
        "component": "views/menu/back-to-top",
        "name": "/menu/back-to-top",
        "hidden": false,
        "meta": {
          "title": "回到顶部",
          "noCache": false,
          // "icon": "nested"
        },
      },
      {
        "path": "/menu/dnd-list",
        "component": "views/menu/dnd-list",
        "name": "/menu/dnd-list",
        "hidden": false,
        "meta": {
          "title": "拖动列表",
          "noCache": false,
          // "icon": "nested"
        },
      },
      {
        "path": "/menu/drag-kanban",
        "component": "views/menu/drag-kanban",
        "name": "/menu/drag-kanban",
        "hidden": false,
        "meta": {
          "title": "拖动看板",
          "noCache": false,
          // "icon": "nested"
        },
      },
      {
        "path": "/menu/shearplate",
        "component": "views/menu/shearplate",
        "name": "/menu/shearplate",
        "hidden": false,
        "meta": {
          "title": "剪切板",
          "noCache": false,
          // "icon": "nested"
        },
      }
    ]
  },
  {
    "path": "/admin/journal",
    "component": "layout/Layout",
    "redirect": "noredirect",
    "name": "journal",
    "hidden": false,
    "meta": {
      "title": "组件2",
      "noCache": false,
      "icon": "example"
    },
    "children": [
      {
        "path": "/journal/nest",
        "component": "views/journal/nest/index",
        "name": "journal/nest",
        "hidden": false,
        "meta": {
          "title": "嵌套路由",
          "noCache": false,
          // "icon": "language"
        },
        "children":[
          {
            "path": "/journal/nest/nesta",
            "component": "views/journal/nest/nesta",
            "name": "nest/nesta",
            "hidden": false,
            "meta": {
              "title": "nesta",
              "noCache": false,
              // "icon": "language"
            }
          },
          {
            "path": "/journal/nest/nestb",
            "component": "views/journal/nest/nestb",
            "name": "nest/nestb",
            "hidden": false,
            "meta": {
              "title": "nestb",
              "noCache": false,
              // "icon": "language"
            }
          },
        ]
      },
      {
        "path": "/journal/index",
        "component": "views/journal/index",
        "name": "journal/index",
        "hidden": false,
        "meta": {
          "title": "菜单组件模板",
          "noCache": false,
          // "icon": "language"
        }
      },
      {
        "path": "/journal/chart",
        "component": "views/journal/chart",
        "name": "journal/chart",
        "hidden": false,
        "meta": {
          "title": "chart图表",
          "noCache": false,
          // "icon": "language"
        },
      
      },
      {
        "path": "/journal/diagram",
        "component": "views/journal/diagram",
        "name": "journal/diagram",
        "hidden": false,
        "meta": {
          "title": "G2图表",
          "noCache": false,
          // "icon": "language"
        }
      },
      {
        "path": "/journal/merge_table",
        "component": "views/journal/merge_table",
        "name": "journal/merge_table",
        "hidden": false,
        "meta": {
          "title": "merge_table",
          "noCache": false,
          // "icon": "language"
        }
      },
    ]
  },
  {
    "path": "/admin/example",
    "component": "layout/Layout",
    "redirect": "noredirect",
    "name": "example",
    "hidden": false,
    "meta": {
      "title": "富文本事例",
      "noCache": false,
      "icon": "language"
    },
    "children": [
      {
        "path": "/example/create",
        "component": "views/example/create",
        "name": "example/create",
        "hidden": false,
        "meta": {
          "title": "创建文章",
          "noCache": false,
          // "icon": "language"
        },
      
      },
      {
        "path": "/example/list",
        "component": "views/example/list",
        "name": "example/list",
        "hidden": false,
        "meta": {
          "title": "文章列表",
          "noCache": false,
          // "icon": "language"
        },
      
      },
      {
        "path": "/example/edit/:id",
        "component": "views/example/edit",
        "name": "example/edit",
        "hidden": true,
        "meta": {
          "title": "编辑文章",
          "noCache": false,
          // "icon": "language"
        },
      
      },
    ]
  },
  {
    "path": "/admin/test",
    "component": "layout/layout",
    "redirect": "noredirect",
    "name": "test",
    "hidden": false,
    "meta": {
      "title": "测试",
      "noCache": false,
      "icon": "bug"
    },
    "children": [
      {
        "path": "/test/index",
        "component": "views/test/index",
        "name": "test/index",
        "hidden": false,
        "meta": {
          "title": "测试列表",
          "noCache": false,
          "icon": "building"
        },
      
      },
      {
        "path": "/test/video",
        "component": "views/test/video",
        "name": "test/video",
        "hidden": false,
        "meta": {
          "title": "video",
          "noCache": false,
          "icon": "building"
        },
      
      }
    ]
  },
]

