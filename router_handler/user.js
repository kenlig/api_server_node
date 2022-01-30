const db=require('../db/index');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const config=require('../config');
exports.regUser = (req, res) => {
    const userinfo = req.body;
    /* if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, msg: '用户名或密码不合法！' });
    } */

    const sqlStr='select * from ev_users where username=?';
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err){
            //return res.send({status:1,msg:err.message});
            return res.cc(err);
        }
        if(results.length>0){
            //return res.send({status:1,msg:'用户名已经被占用！'});
            return res.cc('用户名已经被占用！');
        }
        //jia mi
        
        userinfo.password=bcrypt.hashSync(userinfo.password,10);
        const sql='insert into ev_users set ?';
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err){
                return res.cc(err);
            }
            if(results.affectedRows!==1){
                return res.cc('failed');
            }
            res.cc('success',0);
        })
    })


    //res.send('reg ok');
}
exports.login = (req, res) => {
    const userinfo=req.body;
    const sqlStr='select * from ev_users where username=?';
    db.query(sqlStr,userinfo.username,function(err,results){
        if(err) return res.cc(err);
        if(results.length!==1) return res.cc('login failed!');
        const compareResult=bcrypt.compareSync(userinfo.password,results[0].password);
        if(!compareResult){
            return res.cc('login failed!');
        }
        const user={...results[0],password:'',user_pic:''};
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{
            expiresIn:'10h'
        })
        return res.send({
            status:0,
            msg:'login successed!',
            token:'Bearer '+tokenStr
        })
    })
}