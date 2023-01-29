const mongoose = require('mongoose');

// we have in the database the  counter how count the users in the database 
const CounterCustomerSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    customerNumber: {
        type: Number,
        default: 0
    }

});
module.exports = mongoose.model('CounterCustomer', CounterCustomerSchema);
