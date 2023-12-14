var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');
const bcrypt = require("bcrypt");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login',  user: req.session.user});
});

router.post('/', async function(req, res, next){
  let phoneNumber = req.body.phoneNumber;
  let password = req.body.password;
  const user = await models.user.findOne({ where: { phoneNumber } });
  //console.log(user);
  if(user){
      bcrypt.compare(password, user.password, function(err, result){
          if(result){
              req.session.user = user;
              req.session.message = "Welcome!";
              user.update({last_login: new Date()}, {where: { phoneNumber: phoneNumber }});
              res.redirect("/inicioUsuarioRegistrado");
          } else {
              req.session.error = "Incorrect username or password";
              res.redirect("/login");
          }
      });
  } else {
      req.session.error = "Incorrect username or password";
      res.redirect("/login");
  }
});

module.exports = router;
