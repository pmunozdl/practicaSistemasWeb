var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conversor', { title: 'Conversor de divisas para usuario Invitado', user: req.session.user });
});


module.exports = router;
