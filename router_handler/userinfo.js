const db = require('../db/index');
const bcrypt = require('bcryptjs');
const req = require('express/lib/request');

exports.getUserInfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?';
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('get user info failed!');
        res.send({
            status: 0,
            msg: 'get user info successed!',
            data: results[0]
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?';
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('update user info failed!');
        return res.cc('update user info successed!', 0);
    })
}

exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id=?';
    db.query(sql, req.user.id, (err, results) => {  
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('users do not exist!');
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('old password error!');
        const sqlStr = 'update ev_users set password=? where id=?';
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) {
                return res.cc('update password failed!');
            }
            res.cc('update password successed!', 0);
        })
    })

}

exports.updateAvatar=(req,res)=>{
    const sql='update ev_users set user_pic=? where id=?';
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err) return res.cc(err);
        if(results.affectedRows!==1) return res.cc('update avatar failed!');
        return res.cc('update avatar success',0);
    })
}