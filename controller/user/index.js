// module.exports = {
//     test (req, res, next) {
//         console.log('进来了test~~~~~~~~~~~~~~~~~')
//         res.render('index', { title: 'Expresstest1' });
//     }
// }
'use strict'
// const Services = require('../../services/user')
class UsersController {
    async create (req, res) {
        console.log('createcreatecreatecreate')
        res.send('respond with a resource');
        // const paramas = req.body
        // const result = await Services.user.addUser(paramas)
        // res.send(result)
    }
}

module.exports = new UsersController()