
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


//引入插件读取body请求体数据psot请求专属
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const {verifytoken}=require('./util/jwt')

app.use(function (req, res, next) {
    console.log(req.url,'url')
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
    if (req.url != '/demo/login'&&req.url!='/demo/register'&&req.url!='/demo/users/getMenus') {
        const token = req.headers.vue_token;
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (!verifytoken(token)) {
            console.log(token,'token校验失败')
            res.send({status: 404, msg: '登录已过期,请重新登录'});
        } else {
            console.log(token,'token校验通过')
            next();
        }
    } else {
        next();
    }
});

app.use('/demo/', indexRouter);
app.use('/demo/users', usersRouter);



module.exports = app;
