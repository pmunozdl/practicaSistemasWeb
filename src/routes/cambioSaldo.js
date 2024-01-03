var express = require('express');
var router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cambioSaldo', { title: 'Cambio Saldo', user: req.session.user });
});
router.post('/', async function(req, res, next){
  saldo = req.session.user.saldo;
  const monedaEl_one = req.body.moneda1;
  const monedaEl_two = req.body.moneda2;
  const cantidadEl_one = req.body.cantidad1;
  if (!isNaN(cantidadEl_one)) {
    if (cantidadEl_one <= saldo) {
      // const temp = monedaEl_one;
      // monedaEl_one = monedaEl_two;
      // monedaEl_two = temp;
      fetch(`https://api.exchangerate-api.com/v4/latest/${monedaEl_one}`)
        .then(res => res.json())
        .then(data => {
            const taza = data.rates[monedaEl_two];
            cantidadEl_two = (cantidadEl_one * taza).toFixed(2);
            console.log(cantidadEl_two);
            req.body.cantidad2 = cantidadEl_two;
        });
    } else {
      req.session.error = "No dispones de ese dinero";
      res.redirect("/cambioSaldo");
      }
  } else {
    req.session.error = "La cantidad introducida no es un número";
    res.redirect("/cambioSaldo");
  }
  } );


module.exports = router;
