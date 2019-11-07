var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var RedisStore = require('connect-redis')(session);


var index = require('./routes/index');
var users = require('./routes/users');
var board = require('./routes/board');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session 
// app.use(router) 위에 세션 정보가 잇어야함 안그럼  cannot set property of undefined 오류남....개고생함..
// https://tanyanam.com/2012/06/28/sessions-with-node-js-express-typeerror-cannot-set-property-x-of-undefined/
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 360000 },
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', users);
app.use('/', board);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// app.use(express.cookieParser());
// app.use(session({
//   store: new RedisStore(  /*redis config: host, port 등*/), 
//   // 세션 저장소를 레디스 서버로 설정
//   /* 이하 express.session 코드와 동일 */
//   secret: '@#@$MYSIGN#@$#$',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { maxAge: 360000 },
// }));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', process.env.PORT || 80);

var server = app.listen(app.get('port'), function() {
  console.log('서버가 ' + server.address().port + ' 포트에서 실행중!!!');
});

module.exports = app;
