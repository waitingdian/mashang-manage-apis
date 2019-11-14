var mongoose = require('../../db.js')
var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: false,
        type: String
    },
    sex: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    remark: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)
// var TodoModel = mongoose.model('user');//引入模型






















// var mongoose = require('./db.js')
// var TodoModel = mongoose.model('user');//引入模型
// 免费试听
// class Audition {
//     async audition (data) {
//         // return '试听 success'
//         // new TodoModel({ //实例化对象，新建数据
//         //     content: req.body.content,
//         //     updated_at: Date.now()
//         // }).save(function(err, todo, count) { //保存数据
//         //     console.log('内容', todo, '数量', count); //打印保存的数据
//         //     res.redirect('/'); //返回首页
//         // });
//     }
// }
//
// module.exports = new Audition()
