// var createError = require('http-errors');
// module.exports = function(req, res, next) {
//     next(createError(404));
// }
'use strict'
// 404错误处理中间件

module.exports = (req, res, next) => {
    res.send('404,您访问的路由不存在！')
}

