var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var loginRouter = require('./routes/login');
var aboutRouter = require('./routes/about');
var registerRouter = require('./routes/register');

var app = express();

app.use(
  session({
    secret: 'myApp-digitalhouse', // Trocar para uma UUID depois,
    resave: true,    // Opção que diz para o servidor, que a sessão deve ser renovada a cada acesso;       
    saveUninitialized: true, // Força uma sessão que não está inicializada para que seja salva na store;
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/about', aboutRouter);
app.use('/login', loginRouter);  // pelo o amor de deus, presta atenção no código, o ' ' é só no primeiro parametro //
app.use('/register', registerRouter);

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
