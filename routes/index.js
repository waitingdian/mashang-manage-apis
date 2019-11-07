// 路由文件主要相应相应的HTTP请求，然后执行函数进行相应的逻辑处理，以上代码，是对GET请求的响应，然后渲染view目录下的index.jade页面（在app.js中设置了视图目录和模板引擎），同时传递数据{title: 'Express'}给index.jade页面。
// 引入依赖包
const express = require('express');
// 创建路由对象
const router = express.Router();
const user = require('./user');
const miniprogram = require('./miniprogram');

// 用户相关模块
router.use('/user', user);
router.use('/miniprogram', miniprogram);

module.exports = router;
