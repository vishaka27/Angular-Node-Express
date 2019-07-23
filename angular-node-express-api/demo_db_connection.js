var mysql = require('mysql');

const query = 'SELECT * FROM info';

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ironman@2',
    database: 'customers'
});

con.connect(function(err) {
    // if (err) throw err;
    console.log('connected!');
});

con.query(query, function(err, rows, fields) {
    console.log('err', err);
    if (!err) {
        console.log('Result', rows);
    } else {
        console.log('Error while querying');
    }
});

// con.end();

