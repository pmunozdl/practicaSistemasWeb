var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', async function(req, res, next){
  let username = req.body.user;
  const user = await models.user.findOne({ where: { username } });
  //console.log(user);
  if(user){
      bcrypt.compare(req.body.pass, user.password, function(err, result){
          if(result){
              req.session.user = user;
              req.session.message = "Welcome!"
              res.redirect("/restricted");
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
