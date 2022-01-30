const express=require('express');
const router=express.Router();
const router_handler=require('../router_handler/artcate');
const expressJoi=require('@escook/express-joi');

const {add_cate_schema, delete_cate_schema, get_cate_schema, update_case_schema}=require('../schema/artcate');

router.get('/cates',router_handler.getArticleCates);
router.post('/addcates',expressJoi(add_cate_schema),router_handler.addArticleCates);
router.get('/deletecate/:id',expressJoi(delete_cate_schema),router_handler.deleteCateById);
router.get('/cates/:id',expressJoi(get_cate_schema),router_handler.getArtCateById);
router.post('/updatecase',expressJoi(update_case_schema),router_handler.updateCateById);

module.exports=router;