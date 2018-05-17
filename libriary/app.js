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
var app = express();
var bluebird = require('bluebird');
var jwt = require('jsonwebtoken');

const jwtSecret = "MY_SECRET"; // ключ для подписи JWT
const socketioJwt = require('socketio-jwt');
const socketIO = require('socket.io');

const http = require('http');

const server = http.createServer(app);
var io = require('socket.io').listen(server);


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

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3001';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`API running on localhost:${port}`));

/**
 * Socket events
 */
 io.set('authorization', socketioJwt.authorize({
   secret: jwtSecret,
   handshake: true
 }));


io.sockets.on('connection', function(socket) {

    if(socket.handshake) {
      console.log(jwt.verify(socket.handshake.query.token, jwtSecret).ticket, 'connected');
    }
    console.log('Socket connected');

    socket.on('connect', function(socket){
      console.log(socket.handshake.query, 'connected');
    });

    socket.on('bookSaved', function(book) {
      io.emit('bookSaved', book);
      console.log('bookSaved');
    })

    // Socket event for gist updated
    socket.on('bookUpdated', function(bookUpdated){
      io.emit('bookUpdated', bookUpdated);
    });
    //this socket is authenticated, we are good to handle more events from it.
  });
  // Socket event for gist created





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
  // dbo.collection("books").find().forEach(book => {
  //   dbo.collection("books").update({_id: book._id}, {'$unset' : {'BookId' : ""}, {'Price' : ""}, {'Cipher' : ""}})
  // })
  // var ticket = "KP"
  // var ticket_id = 111111
  //
  // dbo.collection("users").find().forEach( user => {
  //   console.log(user._id);
  //   console.log(ticket + ticket_id++);
  //   dbo.collection("users").update({_id: user._id}, {'$set' : {'ticket': ticket + ticket_id++}})
  // } )
});




module.exports = app;
