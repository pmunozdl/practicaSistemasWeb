const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


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


// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'El secreto que queramos nosotros'
}));

// app.use(function(req, res, next){
//   let error = req.session.error;
//   let message = req.session.message;
//   delete req.session.error;
//   delete req.session.message;
//   res.locals.error = "";
//   res.locals.message = "";
//   if (error) res.locals.error = `<p>${error}</p>`;
//   if (message) res.locals.message = `<p>${message}</p>`;
//   next();
// });
app.use('/', indexRouter);
app.use('/sobreNosotros', sobreNosotrosRouter);
app.use('/login', loginRouter);
app.use('/registro', registroRouter);
app.use('/inicioInvitado', inicioInvitadoRouter);
app.use('/beneficioRegistro', beneficioRegistroRouter);
app.use('/conversor', conversorRouter);
app.use('/inicioUsuarioRegistrado', restrictUser, inicioUsuarioRegistradoRouter);
app.use('/cambioSaldo', restrictUser, cambioSaldoRouter);
app.use('/bizum', restrictUser, bizumRouter);
app.use('/transferencia', restrictUser, transferenciaRouter);
app.use('/enviaDinero', restrictUser, enviaDineroRouter);
app.use('/interfazAdmin', restrictAdmin, interfazAdminRouter);
app.use('/validarTransacciones', restrictAdmin, validarTransaccionesRouter);
app.use('/PanelControl', restrictAdmin, PanelControlRouter);
app.use('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.redirect("/");
  })
})

// app.use('/users', usersRouter);


function restrictUser(req, res, next){
  if(req.session.user){
    if (req.session.user.rol === "user") {
      next();
    } else {
      req.session.error = "Unauthorized access";
      res.redirect("/interfazAdmin");
    }
  } else {
      req.session.error = "Unauthorized access";
      res.redirect("/login");
    }
  }
function restrictAdmin(req, res, next){
  if(req.session.user){
    if (req.session.user.rol === "admin") {
      next();
    } else {
      req.session.error = "Unauthorized access";
      res.redirect("/inicioUsuarioRegistrado");
    }
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
