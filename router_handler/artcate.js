const db = require('../db/index');
exports.getArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc';
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            msg: 'get article list success!',
            data: results
        })
    })
}

exports.addArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where name=? or alias=?';
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        if (results.length === 2) return res.cc('分类和别名都被占用了！');
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类和别名都被占用了！');
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类被占用了！');
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('别名被占用了！');
        const sqlStr = 'insert into ev_article_cate set ?';
        db.query(sqlStr, req.body, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('add failed!');
            res.cc('add successed!', 0);
        })
    })
}

exports.deleteCateById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?';
    db.query(sql, req.params.id, (err, results) => {
        if (err) res.cc(err);
        if (results.affectedRows !== 1) return res.cc('delete article failed');
        res.cc('delete article success!', 0);
    })
}

exports.getArtCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where id=?';
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('get article cates failed!');
        res.send({
            status: 0,
            msg: 'get article cates success!',
            data: results[0]
        })
    })
}

exports.updateCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where Id<>? and (name=? or alias=?';
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
        const sql='update ev_article_cate set ? where Id=?';
        db.query(sql,[req.body,req.body.Id],(err,results)=>{
            if(err) return res.cc(err);
            if(results.affectedRows!==1) return res.cc('update case failed!');
            res.cc('update case success!',0);
        })
    })
}