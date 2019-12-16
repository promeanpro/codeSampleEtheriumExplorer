var express = require('express');
var accountController = require('../controllers/accountController');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account/get-transactions', function(req, res, next) {
  accountController.getAccountTransactions(req, res);
});

module.exports = router;
