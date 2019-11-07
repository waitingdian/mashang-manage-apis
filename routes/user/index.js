var express = require('express');
var router = express.Router();

/* GET users listing. */
// 获取首页
var userTsetController = require('../../controller/user')
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express2221' });
});
router.get('/create', userTsetController.create);

module.exports = router;
