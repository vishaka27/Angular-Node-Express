let validator = require('fastest-validator');
const CustomerModel = require('../models/model.customer');

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
        return customer;
    }

    static retrieve(uid) {
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

    static getByName(first_name) {
        for (var key in customers) {
            if ((customers[key] !== null) && (customers[key].first_name !== null)) {
                return customers[key];
            } else {
                throw new Error('No data found for customer' + first_name);
            }
        }
    }
}

module.exports = CustomerService;