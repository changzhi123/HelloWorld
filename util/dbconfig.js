const mysql=require('mysql')
module.exports={
    // 数据库配置
    config:{
        host:'localhost',
        // host:'47.93.220.79',
        port:'3306',//端口
        user:'root',//安装数据库用户名
        password:'123456',//密码
        database:'amd',//连接数据库的名字
        multipleStatements:true     //允许执行多条语句
    },
    //使用mysql的连接池
    //连接池对象
    sqlConnect:function(sql,callBack){
      const pool=mysql.createPool(this.config)
      pool.getConnection((err,conn)=>{
          console.log('123456')
          if(err){
              console.log('链接失败!')
              return
          }
          //事件驱动回调
          conn.query(sql,callBack);
          //释放连接
          conn.release()

      })  
    }
}