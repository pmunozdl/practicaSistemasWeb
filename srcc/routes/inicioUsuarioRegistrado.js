var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inicioUsuarioRegistrado', { title: 'Bienvenido Usuario Registrado' });
});

module.exports = router;
