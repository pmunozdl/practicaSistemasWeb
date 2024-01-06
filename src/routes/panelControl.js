var express = require('express');
var router = express.Router();
const { Sequelize, Model, where } = require('sequelize'); //cargo la librería sequelize
const { models } = require('../sequelize');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let usuarios = await models.user.findAll({where: {rol:"user"}});
  let mensaje;
  res.render('panelControl', { title: 'Panel de Control Administrador',usuarios,mensaje,user: req.session.user });
});

router.post('/deleteUser',  async function(req, res, next){ // método para borrar usuarios. Puede haber varios post en una clase
  const username = req.body.username;
  if(req.session.user.rol == "admin") { // si el rol de usuario es igual a admin, puede acceder a la pestaña. 
      await models.user.destroy({
        where: {
          username: username
        },
      });; // destroy para sequelize. En arrays basta con delete database.users.data[username]; 
      res.redirect("/panelControl");
  }else{
      req.session.error = "Unauthorized access"; // si no es admin, no puede.
      res.redirect("/panelControl");
  }
});

/*  si fuera con array
router.post('/deleteUser', function(req, res, next){ // método para borrar usuarios. Puede haber varios post en una clase
    const username = req.body.username;
    if(req.session.user.role == "admin") { // si el rol de usuario es igual a admin, puede acceder a la pestaña. 
        delete database.users.data[username]; 
        res.redirect("/admin");
    }else{
        req.session.error = "Unauthorized access"; // si no es admin, no puede.
        res.redirect("/");
    }
});
*/
module.exports = router;
