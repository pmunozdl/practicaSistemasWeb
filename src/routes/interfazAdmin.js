var express = require('express');
var router = express.Router();
const { Sequelize, Model } = require('sequelize'); //cargo la librería sequelize
const { models } = require('../sequelize');


/* GET home page. */
router.get('/', async function(req, res, next) {
  let usuarios = await models.user.findAll({where: {rol:"user"}});
  let transacciones = await models.transaccion.findAll({where: {Confirmado:true}});
  res.render('interfazAdmin', { title: 'Bienvenido Administrador',usuarios,transacciones, user: req.session.user });
});

module.exports = router;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sequelize/db.sqlite',
  logging: true
});

const modelDefiners = [
  require('../sequelize/models/user.model'),
  // El resto de modelos
];
for (const modelDefiner of modelDefiners){
  modelDefiner(sequelize);
}