const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config');
const expressJWT = require('express-jwt');
const joi = require('joi');
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next();
})
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));
const userRouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
const artCateRouter=require('./router/artcate');
app.use('/api', userRouter);
app.use('/my', userinfoRouter);
app.use('/my/article',artCateRouter);

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) res.cc(err);
    if (err.name === 'UnauthorizedError') res.cc('auth failed');
    else res.cc(err);
})

app.listen(8080, function () {
    console.log('api server running at localhost:8080');
})