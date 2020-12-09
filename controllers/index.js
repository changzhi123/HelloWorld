const dbconfig = require('../util/dbconfig')
const {
    settoken
} = require('../util/jwt')
const crypto = require("../util");
//获取分类 http://localhost:3000
/**
 * 管理员列表
 */
getCate = (req, res) => {
    console.log(req.body, '请求参数')
    const {
        pageSize,
        currentPage,
        username,
        type
    } = req.body

    // select * from user where switch=1 and sss like "%das%" or sss like   and并且  or  或者 like模糊查询

    let sql = `select * from user where switch=1` //这是查询
    if (username) sql = `select * from user where switch=1 and username like "%${username}%"`
    if (type) {
        sql = `select * from user where switch=1 and type=${JSON.stringify(type)}`
    }
    if (type && username) {
        sql = `select * from user where switch=1 and type=${JSON.stringify(type)} and username like "%${username}%"`
    }
    console.log(sql, 'sql', username, type)
    const callBack = (err, data) => {
        if (err) throw err;
        else {
            let reslist = data.map(item => {
                item.password = ''
                item.type = JSON.parse(item.type) || ''
                item.token=''
                return item
            })

            let Sizes = (currentPage - 1) * pageSize
            let page = Sizes + pageSize
            res.send({
                'code': 0,
                'total': data.length,
                'data': reslist.slice(Sizes, page)
            })
            res.end()
        }
    }

    dbconfig.sqlConnect(sql, callBack)
}
/**
 * 实现登录验证功能
 */
login = (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    let password_type = crypto.md5(password) //加密 mobile,mailbox,
    console.log(req.body, '请求参数',password_type) //req.body,用于post请求
    const sql = `select * from user where username='${username}'` //这是查询username
    // const sql = "select * from user where username = '" + username + "' and password = '" + password + "'"
    const callBack = (err, data) => {
        if (err) throw err
        else {
            if (data.length == 0) {
                res.send({
                    code: 1,
                    msg: '该用户未注册'
                })
                res.end()
            } else {
                const response = data[0]
                console.log(response,'参数')
                if (response.username == username && response.password == password_type) {
                    const content = {
                        name: username,
                        type:JSON.parse(response.type)
                    }; // 要生成token的主题信息
                    const token = settoken(content, 60 * 30 * 1)
                    const timing=Math.floor(new Date()/1000)+60*30*1
                    dbconfig.sqlConnect(`update user set token='${token}',timing='${timing}' where username='${username}'`)
                    // 带条件修改的语句 吧token写入数据库
                    res.send({
                        code: 0,
                        msg: '登录成功',
                        data: {
                            token
                        }
                    })
                    res.end()


                } else {
                    res.send({
                        code: 1,
                        msg: '用户或密码错误'
                    })
                    res.end()
                }
            }
        }
    }
    dbconfig.sqlConnect(sql, callBack)
}

/**
 * 添加修改管理员
 */
register = (req, res, next) => {
    const {
        username,
        nickname,
        avatar,
        id,
        password
    } = req.body
    const type = JSON.stringify(req.body.type)
    let password_type = ''
    if (password) {
        password_type = crypto.md5(password) //加密 mobile,mailbox,
    }
    console.log(req.body, '请求参数', type, password_type)
    if (!id) {
        const usersql = `select * from user where username='${username}'` //查
        dbconfig.sqlConnect(usersql, (err, data) => {
            if (err) throw err
            else {
                if (data.length != 0) {
                    res.send({
                        code: 1,
                        msg: '该用户已经被注册'
                    })
                    res.end()
                } else if (data.length == 0) {

                    // const sql = `insert into user(username, password) values('${username}', '${password}')`//写入，可以批量写入多条数据
                    const sql = `insert into user set username='${username}',password='${password_type}',type='${type}',nickname='${nickname}',avatar='${avatar}',switch=1 ` //写入，只能单个写入
                    dbconfig.sqlConnect(sql, (err, data) => {
                        if (err) throw err;
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
        })
    } else {
        let sql=''
        if(password_type){
           sql = `update user set type='${type}',avatar='${avatar}',nickname='${nickname}',password='${password_type}' where id=${id}`
        }else{
            sql = `update user set type='${type}',avatar='${avatar}',nickname='${nickname}' where id=${id}`
        }
      
        dbconfig.sqlConnect(sql, (err, data) => {
            if (err) throw err;
            else {
                res.send({
                    'code': 0,
                    'msg': '修改成功！'
                }) //响应的结果
                res.end()
            }
        })

    }



}
/**
 *删除用户
 */
delunser = (req, res, next) => {
    console.log(req.query, '请求参数')
    const {
        id
    } = req.query
    const sql = `update user set switch=0 where id=${id}`
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


module.exports = {
    getCate,
    login,
    register,
    delunser
}