// 主要是初始化Express应用的一些设置，包括引入依赖包、引入路由文件、注册各类中间件的一些操作。
// 引入依赖包
var createError = require('http-errors');
require('./db')
var config = require('./config')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var connectMongo = require('connect-mongo');
// 引入路由文件


// 创建应用实例
var app = express();

const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
        url: config.url
    })
}))

// 设置视图目录和模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 以下皆为注册中间件
// 内置中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', require('./routes'));

// 路由中间件


// 404错误处理中间件
var notFind = require('./middlewares/not-find')
app.use(notFind);

// 错误处理中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.all('*', (req, res, next) => {
//     const { origin, Origin, referer, Referer } = req.headers;
//     const allowOrigin = origin || Origin || referer || Referer || '*';
//     res.header("Access-Control-Allow-Origin", allowOrigin);
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true); //可以带cookies
//     res.header("X-Powered-By", 'Express');
//     if (req.method == 'OPTIONS') {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });

// 导出app实例对象
module.exports = app;
