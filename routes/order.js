const router = require("express").Router();
const verify = require("./verifyToken");
const Order = require("../models/Order.js");
const CounterOrders = require('../models/CounterOrders');

// get all orders
router.get("/ordersUser", verify, async (req, res) => {
  try {
// req  request data from user , we receive from token  !
//res.send(req.user);


//we  req.user.idUser receive form verifyToken , the user is an object what have adUser property
const orders = await Order.find({ "user.idUser": req.user.idUser });

    res.status(200).json(orders);
  } catch (error) {
    res.send(`some error occured => ${error}}`);
  }
});

// for all orders 
router.get('/',async(req,res)=>{

  try{

  const order= await Order.find()
  res.status(200).json(order)
  }
  catch (error)
  {

  res.send(`some error occured => ${error}}`)
  }

  })





// post 
router.post("/postOrder",verify, async (req, res) => {
  // const user = await User.findOne({ idUser: req.user.idUser });
 

// get the next ID
const counter = await CounterOrders.findOneAndUpdate(
  { _id: 'orderId' },
  //  This is the query that is used to find the document in the collection. It looks for a document with an _id field that has a value of "userId".
  { $inc: { orderNumber: 1 } },
  { new: true, upsert: true }
);
// { $inc: { seq: 1 } }: This is the update that is applied to the found document. The $inc operator is used to increment the value of the "seq" field by 1.
// { new: true, upsert: true }: These are options that are passed to the findOneAndUpdate() method. The new: true option tells the method to return the updated document, rather than the original document. 
// The upsert: true option tells the method to create a new document if it can't find one that matches the query.



//   push idUser in order   to know whose customer the order is

  
    //  destructure the object before posting it
 
    // Save the new object
 // we receive from token  !
  // req.user.idUser ;

  try {
    // Destructure the request body
    const {
      items,
      user: { firstname, lastname, email },
      address: { phone, country, street, houseNumber, zipcode, city },
      payment: {
        total,
        currency,
        dateOrder,
        paymentMethod: {
          payment,
          bank_transfer: { iban },
          card_Visa_Mastercard: { numberCard, ll_aa, cvc },
          paypal: { paypalEmail },
        },
      },
    } = req.body;
    const userId = req.user.idUser;
    // Add the user ID to the order
    const newOrder = await Order.create({
      idOrder: counter.orderNumber,
      items,
      user: { idUser: userId, firstname, lastname, email },
      address: { phone, country, street, houseNumber, zipcode, city },
      payment: {
        total,
        currency,
        dateOrder, 
        paymentMethod: {
          payment,
          bank_transfer: { iban },
          card_Visa_Mastercard: { numberCard, ll_aa, cvc },
          paypal: { paypalEmail },
        },
      }, 

    } )


    // Save the new order
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

});

module.exports = router;
