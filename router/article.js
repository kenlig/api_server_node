const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require('path');
const expressJoi = require('@escook/express-joi')

const { add_article_schema } = require('../schema/article')

const router_handler=require('../router_handler/article');
const upload=multer({dest:path.join(__dirname,'../uploads')});

router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema),router_handler.addArticle);

module.exports=router;