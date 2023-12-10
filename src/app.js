const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const sobreNosotrosRouter = require('./routes/sobreNosotros');
const loginRouter = require('./routes/login');
const registroRouter = require('./routes/registro');
const inicioInvitadoRouter = require('./routes/inicioInvitado');
const beneficioRegistroRouter = require('./routes/beneficioRegistro');
const conversorRouter = require('./routes/conversor');
const inicioUsuarioRegistradoRouter = require('./routes/inicioUsuarioRegistrado');
const cambioSaldoRouter = require('./routes/cambioSaldo');
const bizumRouter = require('./routes/bizum');
const transferenciaRouter = require('./routes/transferencia');
const enviaDineroRouter = require('./routes/enviaDinero');
const interfazAdminRouter = require('./routes/interfazAdmin');
const PanelControlRouter = require('./routes/panelControl');
const validarTransaccionesRouter = require('./routes/validarTransacciones');


const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sobreNosotros', sobreNosotrosRouter);
app.use('/login', loginRouter);
app.use('/registro', registroRouter);
app.use('/inicioInvitado', inicioInvitadoRouter);
app.use('/beneficioRegistro', beneficioRegistroRouter);
app.use('/conversor', conversorRouter);
app.use('/inicioUsuarioRegistrado', restrict, inicioUsuarioRegistradoRouter);
app.use('/cambioSaldo', restrict, cambioSaldoRouter);
app.use('/bizum', restrict, bizumRouter);
app.use('/transferencia', restrict, transferenciaRouter);
app.use('/enviaDinero', restrict, enviaDineroRouter);
app.use('/interfazAdmin', restrict, interfazAdminRouter);
app.use('/validarTransacciones', restrict, validarTransaccionesRouter);
app.use('/PanelControl', restrict, PanelControlRouter);

app.use('/users', usersRouter);


function restrict(req, res, next){
  if(req.session.user){
    next();
  } else {
    req.session.error = "Unauthorized access";
    res.redirect("/login");
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
