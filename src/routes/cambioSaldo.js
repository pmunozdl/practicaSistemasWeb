var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cambioSaldo', { title: 'Cambio Saldo', user: req.session.user });
});

module.exports = router;
