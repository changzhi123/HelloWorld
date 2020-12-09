const express = require('express');
const router = express.Router();
const cate=require('../controllers/index')
/* GET home page.*/
router.post('/', cate.getCate);//查询管理员列表
router.post('/login',cate.login)//登录
router.post('/register',cate.register)//注册logouts
router.delete('/delunser',cate.delunser)//删除管理员


module.exports = router;
