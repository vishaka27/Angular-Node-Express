var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const port = process.env.port || 5001;
var pool = require('./demo_db_connection');

var users = require('./routes/users');
var customer = require('./routes/customer');
var generate_uid = require('./routes/generate_uid');

const query = 'SELECT * FROM info';

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

exports.executeQuery=function(query,callback){
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }   
        connection.query(query,function(err,rows){
            connection.release();
            if(!err) {
                // console.log('rows', rows);
                callback(null, {rows: rows});
            }           
        });
        connection.on('error', function(err) {      
              throw err;
              return;
        });
    });
}

module.exports = app;


app.listen(port, () => console.log(`Listening on port ${port}`));
