var config = require('./config/config');
var glob = require('glob');
var express = require('express');
var mongoose = require('mongoose');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();


mongoose.connect(config.db);



var db = mongoose.connection;
require('./models/Pacient')
require('./models/Questions')

db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(3000,function (err) {
    console.log('Server listenining on port 3000')
})

module.exports = app;



