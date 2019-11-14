var mongoose = require("mongoose"); //引入mongoose
// mongoose.connect('mongodb://localhost/'); //连接到mongoDB的todo数据库
// var config = require("./config");
mongoose.connect('mongodb://localhost/mashang', { useNewUrlParser: true }, (err, client) => {})
// mongoose.connect(config.url, { useNewUrlParser: true }, (err, client) => {})
// mongoose.connect(config.url, { useNewUrlParser: true }, (err, client) =>
var db = mongoose.connection;

db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});

db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('连接数据库成功!');
});


module.exports = mongoose;
