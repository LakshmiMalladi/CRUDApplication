'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

var customers = require('./routes/customers');
var app = express();
var mysql = require('mysql');
var connection = require('express-myconnection');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'welcome1',
    database: 'my_db'
});*/

app.use(
    connection(mysql, {
        host: 'localhost',
        user: 'root',
        password: 'welcome1',
        database: 'my_db'
    },'pool')
);

app.get('/', routes.index);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.save_edit);


/*connect.connect(function (err) {
    if (err)
        throw err;
    console.log('connected');
    var sql = 'CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))';
    connect.query(sql, function (err, result) {
        if(err)
            throw err;
        console.log('table created');
    });
});*/

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


