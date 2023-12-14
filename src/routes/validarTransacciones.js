var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('validarTransacciones', { title: 'Validador de transacciones', user: req.session.user });
});

module.exports = router;
