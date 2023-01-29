const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  idOrder :Number ,
  items: {
    type: Array,
  },

  user: {
    idUser: Number,
    firstname: String,

    lastname: String,

    email:String,
  },

  address: {
    phone:Number,
    country: String,

    street:String,
    houseNumber: String,

    zipcode: String,

    city: String,
  },

  payment: {
    total: Number ,
    currency: String,

    dateOrder: Date,

    paymentMethod: {
      payment: String,

      bank_transfer: {
        iban: String,
      },

      card_Visa_Mastercard: {
        numberCard: String,
        ll_aa: String,
        cvc: String,
      },

      paypal: {
        paypalEmail: String,
      },
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
