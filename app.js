var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { specs, swaggerUi } = require('./swagger/apiDocs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

/**
 * Setting up views
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/**
 * Registering middlewares
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Registering routers
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', indexRouter);
app.use('/users', usersRouter);


/**
 * Capturing 404 error
 */
app.use(function(req, res, next) {
  next(createError(404));
});


/**
 * Error handling
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
