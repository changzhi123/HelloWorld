const jwt = require('jsonwebtoken');
const dbconfig = require('../util/dbconfig')
const secret = "RS256" // 这是加密的key（密钥）
//生成token
settoken = (content, date) => { 
    const token = jwt.sign(content, secret, {
        expiresIn: date //60*60*1  // *小时过期
    });
    return token
}
//读取token
gettoken=(token)=>{
  return jwt.verify(token, secret) 
}
//校验token
 verifytoken = async(token) => {
    let res
        const result = jwt.verify(token, secret) || {};
        const {exp ,iat,name } = result
        const current = Math.floor(new Date() / 1000);  // Math.floor返回整数
        // iat生效时间 exp有效期
        console.log(result,'现在：',current,'有效期:',exp,'开始时间：',iat,'校验token')
        const sql = `select * from user where username='${name}'` //这是查询username
       return dbconfig.sqlConnect(sql, (err, data) =>{
            if (err) throw err
            else {
                console.log(data,'数据token')
                const {timing }=data[0]
                if(token==data[0].token&&current<=timing){
                    dbconfig.sqlConnect(`update user set timing='${current+60*30*1}' where username='${name}'`)
                    console.log('成功')
                    return true
                }else{
                    console.log('失败')
                    return false
                }
            }
        })
  
    
}

module.exports = {
    settoken,
    verifytoken,
    gettoken

}