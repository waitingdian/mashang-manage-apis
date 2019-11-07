// module.exports = {
//     test (req, res, next) {
//         console.log('进来了test~~~~~~~~~~~~~~~~~')
//         res.render('index', { title: 'Expresstest1' });
//     }
// }
'use strict'
// const Services = require('../../services')

// router.get('/userlist/', function(req, res, next) {
//     var fs = require("fs");
//     var logstr = JSON.stringify({url:req.path});
//     fs.writeFile('log.txt',logstr,'utf-8',function (err) {
//         !err && console.log('文件写入成功id='+req.query.id+'name='+req.query.name);
//         });
//     var str = req.originalUrl;
//     res.send(str);
//     });

// 免费试听
// ?key=value get
// class AuditionController {
//     async audition (req, res) {
//         const paramas = req.query
//         const result = await Services.audition.audition(paramas)
//         res.send(result)
//     }
// }
// post
class MiniprogramController {
    async audition (req, res) {
        const paramas = req.body
        const result = await Services.audition.audition(paramas)
        res.send(result)
    }
}

module.exports = new MiniprogramController()