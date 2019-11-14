var express = require('express');
var router = express.Router();

/* GET users listing. */
var uadminController = require('../../controller/admin')

router.post('/login', uadminController.login);

router.get('/getAllAdmin', uadminController.getAllAdmin);

router.post('/addAdmin', uadminController.addAdmin);

router.post('/deleteAdmin', uadminController.deleteAdmin);

router.post('/changeStatus', uadminController.changeStatus);

router.get('/test11',  function(req, res, next) {
    console.log('jinlaol')
    res.render('index', { title: 'Express2221' });
})

module.exports = router;
