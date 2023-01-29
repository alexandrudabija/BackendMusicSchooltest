const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  idUser: {
    type: Number,
    require:true,
    unique:true,
    message:'Error, expeted {Path}to be uniuqe'
  },
 firstname: {
    type: String,
    require: true,
    min: 2,
  },
  lastname: {
    type: String,
    require: true,
    min: 2,
  },
 
  email: {
    type: String,
    require: true,
    max: 255,
    min: 6,
  },

  password: {
    type: String,
    require: true,
    max: 255,
    min: 6,
  },

  orders: {
    type: Array,
  },
  dateRegistration: {
    type: Date,
   default:Date.now

  },
  yearOfBirth: {
    type: Date,
  },

  country: {
    type: String,
    min: 2,
  },
});

module.exports  = mongoose.model("User", userSchema);
