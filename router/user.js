const express=require('express');
const res = require('express/lib/response');
const router=express.Router();

const user_handler=require('../router_handler/user');
const expressJoi=require('@escook/express-joi');
const {reg_login_schema}=require('../schema/user');
//reg
router.post('/reguser',expressJoi(reg_login_schema),user_handler.regUser);
//login
router.post('/login',expressJoi(reg_login_schema),user_handler.login);

module.exports=router;