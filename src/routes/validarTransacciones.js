var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');
const sequelize = require('../sequelize');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let usuarios = await models.user.findAll({where: {rol:"user"}});
  let transacciones = await models.transaccion.findAll({where: {Confirmado:false}});
  res.render('validarTransacciones', { title: 'Validador de transacciones',usuarios, transacciones, user: req.session.user });
});

router.post('/deleteTransaccion',  async function(req, res, next){ // método para borrar usuarios. Puede haber varios post en una clase
  const username = req.body.username;
  if(req.session.user.rol == "admin") { // si el rol de usuario es igual a admin, puede acceder a la pestaña. 
      await models.transaccion.destroy({
        where: {
          id: username
        },
      });; // destroy para sequelize. En arrays basta con delete database.users.data[username]; 
      res.redirect("/validarTransacciones");
  }else{
      req.session.error = "Unauthorized access"; // si no es admin, no puede.
      res.redirect("/");
  }
});

router.post('/updateTransaccion',  async function(req, res, next){ // método para borrar usuarios. Puede haber varios post en una clase
  const username = req.body.username;
  if(req.session.user.rol == "admin") { // si el rol de usuario es igual a admin, puede acceder a la pestaña. 
      await models.transaccion.update({ Confirmado: true},{
        where: {
          id: username
        },
      });; // destroy para sequelize. En arrays basta con delete database.users.data[username]; 
      res.redirect("/validarTransacciones");
  }else{
      req.session.error = "Unauthorized access"; // si no es admin, no puede.
      res.redirect("/");
  }
});
module.exports = router;
