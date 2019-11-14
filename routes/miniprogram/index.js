var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入对象
// var TodoModel = mongoose.model('user');//引入模型
var URL = require('url'); //引入URL中间件，获取req中的参数需要
// const User = mongoose.model('user');
const User = require('../../models/miniprogram');
// 免费试听
var miniprogramController = require('../../controller/miniprogram')
router.post('/audition', miniprogramController.audition);

router.post('/audition', function(req, res, next) {
    let errTxt = ''
    if (!req.body.name) errTxt = '姓名不能为空'
    if (!req.body.sex) errTxt = '性别不能为空'
    if (!req.body.phone) errTxt = '手机号不能为空'
    let user = {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        phone: req.body.phone,
        remark: req.body.remark
    }
    User.create(user, function(err, user) {
        if (err) {
            return res.json({
                success: false,
                message: errTxt || err.message
            })
        }
        res.json({
            success: true,
            data: user
        })
    })
})

module.exports = router;
