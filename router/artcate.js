const express=require('express');
const router=express.Router();
const router_handler=require('../router_handler/artcate');

router.get('/cates',router_handler.getArticleCates);

module.exports=router;