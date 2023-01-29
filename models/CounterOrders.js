const mongoose = require('mongoose');

// we have in the database the  counter how count the Orders in the database 
const CounterOrdersSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
   
    orderNumber: {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('CounterOrders', CounterOrdersSchema);
