var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const port = process.env.port || 5001;

var users = require('./routes/users');
var customer = require('./routes/customer');
var generate_uid = require('./routes/generate_uid');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/customer', customer);
app.use('/api/v1/generate_uid', generate_uid);

module.exports = app;

app.listen(port, () => console.log(`Listening on port ${port}`));
