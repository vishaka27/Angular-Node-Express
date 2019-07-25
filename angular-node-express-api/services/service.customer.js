let validator = require('fastest-validator');
const CustomerModel = require('../models/model.customer');
const connectionPool = require('../demo_db_connection');

let customers = {};
let counter = 0;

/* create instance of validator */
let customerValidator = new validator();

/* use the same patterns as on client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* customer validator schema */
const customerVSchema = {
    guid: {type: "string", min: 3},
    first_name: {type: "string", min: 1, max: 50, pattern: namePattern},
    last_name: {type: "string", min: 1, max: 50, pattern: namePattern},
    email: {type: "email", max: 75},
    zipcode: {type: "string", max: 5, pattern: zipCodePattern},
    password: {type: "string", min: 2, max: 50, pattern: passwordPattern}
};

class CustomerService {
    static create(data) {
        var vres = customerValidator.validate(data, customerVSchema);
        /* Validation fails */
        if (!(vres === true)) {
            let errors = {}, item;
            for (const index in vres) {
                item = vres[index];
                errors[item.field] = item.message;
            }
            throw {
                name: 'ValidationError',
                message: errors
            };
        }
        let customer = new CustomerModel('', data.first_name, data.last_name, data.email, data.zipcode, data.password);
        customer.uid = 'c' + counter++;
        customers[customer.uid] = customer;
        const getQ = 'SELECT * FROM customer_info';
        connectionPool.query(getQ, function(err, result) {
            if (!err) {
                const customers = result.length;
                const uid = 'c' + result.length;
                console.log('customer length', uid);
                const query = `INSERT INTO customer_info(uid,guid,first_name,last_name,email,password,zipcode) VALUES('${uid}','fdjgkdhg','${customer.first_name}','${customer.last_name}','${customer.email}','${customer.password}','${customer.zipcode}');`
                // INSERT INTO `customers`.`customer_info` (`id`, `uid`, `guid`, `first_name`, `last_name`, `email`, `password`, `zipcode`) VALUES ('0', 'c0', 'fdjgkdhg', 'Vishaka', 'N', 'test@yopmail.com', 'kxfj', '560078');

                connectionPool.query(query, function(err, rows, fields) {
                    console.log('error-----', err);
                    if (!err) {
                        console.log('Result after insertion', rows);
                    } else {
                        console.log('Error while querying');
                    }
                });
            }
        });
         // const query = 'INSERT INTO customer_info(id, uid, guid, first_name, last_name, email, password, zipcode) VALUES(1, ' + customer.uid + ', ' + 'ksjdj9kjlkj' + ', ' + customer.first_name + ', ' + customer.last_name + ', ' + customer.email + ', ' + customer.password + ', ' + customer.zipcode + ')';
        // const query = 'INSERT INTO customer_info (id, uid, guid, first_name, last_name, email, password, zipcode) VALUES (1, '  + customer.uid + ', ' + 'fdjgkdhg' + ', ' + customer.first_name + ', ' + customer.last_name + ', ' + customer.email + ', ' + customer.password + ', ' + customer.email + ')';
        return customer;
    }

    static retrieve(uid) {
        // const query = `SELECT * FROM customer_info WHERE uid = ${uid}`;
        // // INSERT INTO `customers`.`customer_info` (`id`, `uid`, `guid`, `first_name`, `last_name`, `email`, `password`, `zipcode`) VALUES ('0', 'c0', 'fdjgkdhg', 'Vishaka', 'N', 'test@yopmail.com', 'kxfj', '560078');

        // connectionPool.query(query, function(err, rows, fields) {
        //     console.log('error-----', err);
        //     if (!err) {
        //         console.log('Result after viewing by uid', rows);
        //     } else {
        //         console.log('Error while querying');
        //     }
        // });
        if (customers[uid] !== null) {
            return customers[uid];
        } else {
            throw new Error('Unable to retrieve a customer by (uid:' + uid + ')');
        }
    }

    static update(guid, data) {
        if (customers.c0['guid'] !== null) {
            const customer = customers.c0['guid'];
            Object.assign(customer, data);
        } else {
            throw new Error('Unable to retrieve a customer by (uid:' + guid + ')');
        }
    }
    
    static delete(guid) {
        if (customers.c0['guid'] !== null) {
            delete customers.c0['guid'];
        } else {
            throw new Error('Unable to retrieve a customer by (uid:' + guid + ')');
        }
    }

    static getByName(first_name, cb) {
        const query = `SELECT * FROM customer_info c WHERE c.first_name = '${first_name}'`;
        // INSERT INTO `customers`.`customer_info` (`id`, `uid`, `guid`, `first_name`, `last_name`, `email`, `password`, `zipcode`) VALUES ('0', 'c0', 'fdjgkdhg', 'Vishaka', 'N', 'test@yopmail.com', 'kxfj', '560078');

        connectionPool.query(query, function(err, results, fields) {
            console.log('error-----', err);
            if (!err) {
                cb(results);
                console.log('Result after viewing by name', results);
            } else {
                console.log('Error while querying');
                throw new Error('No data found for customer' + first_name);
            }
        });
        // for (var key in customers) {
        //     if ((customers[key] !== null) && (customers[key].first_name !== null)) {
        //         return customers[key];
        //     } else {
        //         throw new Error('No data found for customer' + first_name);
        //     }
        // }
    }
}

module.exports = CustomerService;