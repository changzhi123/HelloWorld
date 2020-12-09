const express = require('express');
const router = express.Router();
const cate=require('../controllers/unser_router')
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.headers.vue_token,'请求体')
  res.send({
    'code': 0,
    'msg':'请求成功，用来假性通过验证',
    'data':[]
})
res.end()
});

router.get('/logouts', cate.logouts);//退出登录
router.get('/getInfo',cate.getInfo)//获取用户信息
router.get('/getMenus',cate.getMenus)//获取菜单
router.get('/getrouter',cate.getrouter)//获取动态路由
router.post('/setrouter',cate.setrouter)//新增编辑菜单
router.delete('/delrouter',cate.delrouter)//新增编辑菜单
router.get('/getrole',cate.getrole)//获取角色列表
router.post('/setrole',cate.setrole)//新增&编辑角色
router.delete('/delrole',cate.delrole)//删除角色
router.get('/getrole/menu',cate.getrolemenu)//获取角色所分配的菜单
router.post('/setrole/menu',cate.setrolemenu)//修改角色所分配的菜单


module.exports = router;
