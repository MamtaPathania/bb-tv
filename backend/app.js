var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var apiRouter = require('./routes/apiRoutes/apiRoutes.router')

var app = express();

const dotenv=require('dotenv')
dotenv.config()

app.use(cors())
// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "http://localhost:3002",
//       "http://localhost:6090",
//       "http://localhost:5000",
//     ],
//   })
// );
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api',apiRouter)


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
