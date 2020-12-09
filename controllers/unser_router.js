const dbconfig = require('../util/dbconfig')
const {
    gettoken
} = require('../util/jwt')
/**
 * 实现退出登录
 */
logouts = (req, res) => {
    console.log(req.headers.vue_token, '请求参数')
    const token = req.headers.vue_token
    //删除语句delete from 表名 where id=1
     let userdata=gettoken(token)
    const sql = `update user set token='${null}',timing='${null}' where username='${userdata.name}'`
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {
            res.send({
                code: 0,
                msg: '退出登录成功'
            })
            res.end()
        }
    })
}
/**
 * 获取角色列表
 */
getrole = (req, res) => {
    const sql = `select * from role where switch=1` //这是查询
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {
            if (data.length != 0) {
                const resdata = [{
                    rolename: '总部权限',
                    id: 'zb',
                    roles: []
                }]
                data.filter(item => {
                    resdata.filter(tab => {
                        if (item.type == tab.id) tab.roles.push(item)
                    })

                })
                res.send({
                    code: 0,
                    msg: '获取角色列表成功',
                    data: resdata
                })
                res.end()
            } else {
                res.send({
                    code: 1,
                    msg: '解析用户信息失败'
                })
                res.end()
            }
        }
    })
}
/**
 * 新增&编辑角色
 */
setrole = (req, res) => {
    console.log(req.body, '请求参数')
    const {
        rolename
    } = req.body
    const sql = `select * from role where rolename='${rolename}'` //这是查询
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {
            if (data.length > 0) {
                console.log(data, '重复命名验证', rolename)
                res.send({
                    'code': 1,
                    'msg': '该角色名已存在！'
                }) //响应的结果
                res.end()
            } else {
                if (req.body.id) {
                    //编辑
                    const sql = `update role set rolename='${rolename}' where id=${req.body.id}`
                    console.log(sql, 'sql')
                    dbconfig.sqlConnect(sql, (err, data) => {
                        if (err) throw err
                        else {
                            res.send({
                                'code': 0,
                                'msg': '编辑成功！'
                            }) //响应的结果
                            res.end()
                        }
                    })
                } else {
                    const sql = `insert into role (rolename,type,rolegrade,switch) values('${rolename}','${req.body.type}', 0, 1)` //写入，可以批量写入多条数据
                    console.log(sql, 'sql')
                    dbconfig.sqlConnect(sql, (err, data) => {
                        if (err) throw err
                        else {
                            res.send({
                                'code': 0,
                                'msg': '新增成功！'
                            }) //响应的结果
                            res.end()
                        }
                    })
                }
            }

        }

    })

}
/**
 * 删除角色
 */
delrole = (req, res) => {
    console.log(req.query, '请求参数')
    const {
        id
    } = req.query
    const sql = `update role set switch=0 where id=${id}`
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {
            res.send({
                'code': 0,
                'msg': '删除成功!'
            }) //响应的结果
            res.end()
        }
    })
}
/**
 * 获取角色所分配的菜单
 */
getrolemenu = (req, res) => {
    console.log(req.query.id, ' 获取角色列表请求参数')
    const sql = `select * from role where id=${req.query.id}` //这是查询token
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {

            console.log(data)
            if (data.length != 0) {
                res.send({
                    code: 0,
                    msg: '获取角色列菜单成功',
                    data: JSON.parse(data[0].control) || []
                })
                res.end()
            } else {
                res.send({
                    code: 1,
                    msg: '解析用户信息失败'
                })
                res.end()
            }
        }
    })
}
/**
 * 修改角色所分配的菜单
 */
setrolemenu = (req, res) => {
    // const{id,control}=res.body
    console.log(req.body, '请求参数')
    if (req.body.id && req.body.control) {
        const control = JSON.stringify(req.body.control)
        const sql = `update role set control='${control}' where id=${req.body.id}`
        console.log(sql, 'sql', control)
        dbconfig.sqlConnect(sql, (err, data) => {
            if (err) throw err
            else {
                res.send({
                    'code': 0,
                    'msg': '更新成功!'
                }) //响应的结果
                res.end()
            }
        })
    } else {
        res.send({
            'code': 1,
            'msg': '请提交完成的参数！'
        }) //响应的结果
        res.end()
    }
}
/**
 * 获取用户信息
 */
getInfo = (req, res) => {
    console.log(req.headers.vue_token, '请求参数')
    const unser = gettoken(req.headers.vue_token)
    console.log(unser, '信息')
    const sql = `select * from user where username='${unser.name}'` //这是查询
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {
            if (data.length != 0) {
                res.send({
                    code: 0,
                    msg: '获取用户信息成功',
                    data: {
                        username: data[0].username,
                        nickname: data[0].nickname || data[0].username,
                        avatar: data[0].avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
                    }
                })
                res.end()
            } else {
                res.send({
                    code: 1,
                    msg: '解析用户信息失败'
                })
                res.end()
            }
        }
    })
}
/**
 * 获取用户用户的动态路由
 */
getrouter = (req, res) => {
    const unser_data = gettoken(req.headers.vue_token)
    console.log(req.headers.vue_token, '请求参数', unser_data)
    const sql = `select * from role where switch=1 and id=${unser_data.type[1]}`
    let control = []
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {
            control = data[0].control
            const sqltow = `select * from router where is_remove=1`
            dbconfig.sqlConnect(sqltow, (err, data) => {
                console.log(control, '数据2')
                if (err) throw err
                else {
                    const list = [] //赛选出二
                    const listto = [] //三级级菜单
                    const router = data.filter(item => { //赛选出一级菜单
                        if (!control.includes(item.id)) return
                        item.hidden = item.hidden ? true : false
                        item['meta'] = {}
                        item.meta['title'] = item.title
                        item.meta['noCache'] = item.noCache ? true : false
                        item.meta['icon'] = item.icon || ''
                        if (item.rank == 1) {
                            item['children'] = []
                            return item
                        } else if (item.rank == 2) {
                            list.push(item) //二级级菜单
                        } else if (item.rank == 3) {
                            listto.push(item) //三级级菜单
                        }
                    })
                    listto.filter(item => {
                        list.map(tab => {
                            if (item.parent == tab.id) {
                                if (!tab.children) tab['children'] = []
                                return tab.children.push(item) //把三级菜单放进指定的二级菜单中
                            }
                        })
                    })
                    list.filter(item => {
                        router.map(tab => {
                            if (item.parent == tab.id) {
                                return tab.children.push(item) //把处理好的二级菜单放进指定的一级菜单中
                            }

                        })
                    })
                    //去除没有权限的菜单
                    // let resrouter =[]
                    // router.filter
                    res.send({
                        code: 0,
                        msg: '获取菜单成功',
                        data: router
                    })
                    res.end()

                }
            })
        }
    })


}
/**
 * 获取用户菜单
 */
getMenus = (req, res) => {
    // const sql = `select * from router` //这是查询菜单
    const sql = `select * from router where is_remove=1` //is_remove
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {
            const list = [] //赛选出二
            const listto = [] //三级级菜单
            const router = data.filter(item => { //赛选出一级菜单
                item.hidden = item.hidden ? true : false
                item['meta'] = {}
                item.meta['title'] = item.title
                item.meta['noCache'] = item.noCache ? true : false
                item.meta['icon'] = item.icon || ''
                if (item.rank == 1) {
                    item['children'] = []
                    return item
                } else if (item.rank == 2) {
                    list.push(item) //二级级菜单
                } else if (item.rank == 3) {
                    listto.push(item) //三级级菜单
                }
            })
            listto.filter(item => {
                list.map(tab => {
                    if (item.parent == tab.id) {
                        if (!tab.children) tab['children'] = []
                        return tab.children.push(item) //把三级菜单放进指定的二级菜单中
                    }
                })
            })
            list.filter(item => {
                router.map(tab => {
                    if (item.parent == tab.id) {
                        return tab.children.push(item) //把处理好的二级菜单放进指定的一级菜单中
                    }

                })
            })

            res.send({
                code: 0,
                msg: '获取菜单成功',
                data: router
            })
            res.end()
        }
    })
}
/**
 * 编辑&新增菜单
 */
setrouter = (req, res) => {
    const {
        title,
        path,
        component,
        name,
        hidden,
        icon,
        rank,
        order,
        parent
    } = req.body
    let parentto = parent ? parent[parent.length - 1] : null
    console.log(req.body, '请求参数')
    if (!req.body.id) {
        // const sql = `insert into router set title='${reqlist.title}',path='${reqlist.path}',
        // component='${reqlist.component}',name='${reqlist.name}',hidden='${reqlist.hidden}',
        // icon='${reqlist.icon}',rank='${reqlist.rank}',order='${reqlist.order}',parent='${reqlist.parent}' ` //写入，只能单个写入
        const sql = `insert into router (title, path, component, router.name, hidden, icon, rank, router.order, parent,is_remove,noCache) 
        values('${title}', '${path}', '${component}', '${name}', ${hidden}, '${icon}', ${rank}, ${order}, ${parentto},1,0)` //写入，可以批量写入多条数据
        console.log(sql, 'sql')
        dbconfig.sqlConnect(sql, (err, data) => {
            if (err) throw err
            else {
                res.send({
                    'code': 0,
                    'msg': '新增成功'
                }) //响应的结果
                res.end()
            }
        })
    } else {
        const sql = `update router set title='${title}',path='${path}',component='${component}',router.name='${name}',hidden=${hidden}
        ,icon='${icon}',router.order=${order},parent=${parentto} where id=${req.body.id}`
        console.log(sql, 'sql')
        dbconfig.sqlConnect(sql, (err, data) => {
            if (err) throw err
            else {
                res.send({
                    'code': 0,
                    'msg': '修改成功'
                }) //响应的结果
                res.end()
            }
        })
    }
}
/**
 * 删除菜单
 */
delrouter = (req, res) => {
    console.log(req.query, '请求参数')
    const sql = `update router set is_remove=0 where id=${req.query.id}`
    dbconfig.sqlConnect(sql, (err, data) => {
        if (err) throw err
        else {
            res.send({
                'code': 0,
                'msg': '删除成功'
            }) //响应的结果
            res.end()
        }
    })
}
module.exports = {
    logouts,
    getInfo,
    getMenus,
    setrouter,
    delrouter,
    getrole,
    getrolemenu,
    setrole,
    delrole,
    setrolemenu,
    getrouter
}