var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('panelControl', { title: 'Panel de Control Administrador', user: req.session.user });
});

module.exports = router;
