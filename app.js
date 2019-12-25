const createError = require('http-errors');
const useMiddleware = require('./middleware')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')

const indexRouter = require('./routes/index');
const registrationRouter = require('./routes/registration');
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const partiesRouter = require("./routes/parties");



const app = express();
useMiddleware(app);


// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/potluckparty', { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals = {
    loggedin: !!req.session.user,
    name: req.session.user || ""
  }
  next()
})
// Allows you to use PUT, DELETE with forms.
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', indexRouter);
app.use('/parties', partiesRouter);
app.use('/', registrationRouter);
app.use("/", loginRouter);
app.use("/", logoutRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
