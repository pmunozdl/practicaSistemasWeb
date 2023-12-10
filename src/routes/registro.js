var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Registro' });
});
router.post('/', async function(req, res, next){
  //console.log(req.session.user); No hace falta. Usar a modo de debugger.
  const user = req.body.user;
  const pass = req.body.pass; //agarrar name de input
  const pass1 = req.body.pass1;
  const roles = req.body.roles;
    
  if (!database.users[user]) {
    req.session.user = database.users[user]; //accedemos a la informacion del usuario si no existe
    if (pass != pass1) {
      req.session.error = "Passwords don't match";
      res.redirect("/registro");
    } else if (pass.length < 5 && pass1.length < 5) {
      req.session.error = "Passwords need to be 5 characters long";
      res.redirect("/registro");
      // EXPRESIÓN REGULAR
    }else if (!/^[A-Z]{1}[a-z0-9A-Z\._-]+$/.test(pass)){  //EXPRESION REGULAR
      req.session.error = "formato incorrecto de contraseña: Primera letra Mayuscula, + 4 caracteres";
      res.redirect("/registro");
    } else if (pass === pass1) {
      if(roles === "usuario") {
        database.users.register(user, pass, "user", function() {
          //console.log("rol:"+roles);
          console.log("Se ha registrado con exito");
          req.session.message = "You have just registered please enter new account to log in!";
          res.redirect("/login");
        });
      }
      } 
  } else {
    req.session.error = "User already exists";
    res.redirect("/registro");
  }
});
module.exports = router;
