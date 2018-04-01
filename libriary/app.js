var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var passport = require('passport');
var sql = require('mssql');


var api = require('./routes/api.route');
var login = require('./routes/api/login.route');
var books = require('./routes/api/book.route');

var app = express();
var bluebird = require('bluebird')

require('./config/passport');



var mongoose = require('mongoose')
mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/libriary')
.then(()=> { console.log(`Succesfully Connected to the
Mongodb Database  at URL : mongodb://127.0.0.1:27017/libriary`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb
Database at URL : mongodb://127.0.0.1:27017/libriary`)})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

app.use(cors());

app.use('/api', api);
app.use('/users', login);
app.use('/books', books);

app.get("/api/user", function(req , res){
                var query = "select * from [user]";
                executeQuery (res, query);
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/libriary";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var imgs = ['/algebra9.jpg', '/chemistry.jpg', '/geometry.jpg',
              '/history.jpg', '/physics.jpg', '/ukr-language.jpg'];
  var grades = ['7', '8', '9', '10', '11']
  var subjects = ['Алгебра', 'Геометрія', 'Хімія', 'Фізика', 'Історія', 'Укр мова']

  var randImg = imgs[Math.floor(Math.random() * imgs.length)];
  var randGrade = grades[Math.floor(Math.random() * grades.length)];
  var randSubject = subjects[Math.floor(Math.random() * subjects.length)];
  // {'$set' : {'Grade' : grades[Math.floor(Math.random() * grades.length)] }},

  // {'$set' : {'Img' : imgs[Math.floor(Math.random() * imgs.length)] }}

  console.log("Database created!");
  var dbo = db.db("libriary");
  dbo.collection("books").find().forEach(book => {
    dbo.collection("books").update({_id: book._id}, {'$set' : {'Img' : imgs[Math.floor(Math.random() * imgs.length)] }})
  })

});




module.exports = app;
