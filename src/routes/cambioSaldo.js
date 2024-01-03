var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cambioSaldo', { title: 'Cambio Saldo', user: req.session.user });
});
router.post('/', async function(req, res, next){
  saldo = req.session.user.saldo;
  const monedaEl_one = req.body.moneda1;
  const monedaEl_two = req.body.moneda2;
  const cantidadEl_one = req.body.cantidad1;
  const cantidadEl_two = req.body.cantidad2;
  const moneda_one = monedaEl_one.value;
  const moneda_two = monedaEl_two.value;
  if (!isNaN(cantidadEl_one)) {
    if (cantidadEl_one <= saldo) {
      const temp = monedaEl_one.value;
      monedaEl_one.value = monedaEl_two.value;
      monedaEl_two.value = temp;
      fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
        .then(res => res.json())
        .then(data => {
            const taza = data.rates[moneda_two];

            // Modificar el texto del elemento con id cambioEl
            cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

            cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);
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
