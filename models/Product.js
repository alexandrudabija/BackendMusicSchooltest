const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

 
    idProduct: Number,
      nameProduct: String,
      brandProduct: String,
      priceProduct: Number,
      imgProduct: String,
      quantityProduct: Number,
      stockProduct:Number,


});

module.exports = mongoose.model("Product", productSchema);
