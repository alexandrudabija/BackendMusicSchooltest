const router = require('express').Router();
const User = require('../models/User');
const bcrypt= require('bcryptjs');
const CounterCustomer = require('../models/CounterCustomer');
const jwt= require('jsonwebtoken');
// const cookieParser = require('cookie-parser');


// validation /npm install @hapi/joi
const {registerValidation ,loginValidation }= require('../validation');


 

router.post('/register',async(req,res)=>{


    // lets validate the data before we a user 
   const {error}=  registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

//    checking id the user is already in  the database 
const emailExist =await User.findOne({email:req.body.email})
if(emailExist)return res.status(400).send('Email alredy exist');

// get the next ID
const counter = await CounterCustomer.findOneAndUpdate(
    { _id: 'userId' },
    //  This is the query that is used to find the document in the collection. It looks for a document with an _id field that has a value of "userId".
    { $inc: { customerNumber: 1 } },
    { new: true, upsert: true }
);
// { $inc: { seq: 1 } }: This is the update that is applied to the found document. The $inc operator is used to increment the value of the "seq" field by 1.
// { new: true, upsert: true }: These are options that are passed to the findOneAndUpdate() method. The new: true option tells the method to return the updated document, rather than the original document. 
// The upsert: true option tells the method to create a new document if it can't find one that matches the query.




const newId = counter.customerNumber;


// for hashing password  npm install bcryptjs 
const salt =await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt)



//    create a new user 
    const user = new User ({

        idUser:newId,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:hashedPassword,
        orders:req.body.orders,
        dateRegistration:req.body.dateRegistration,
        yearOfBirth:req.body.yearOfBirth,
        country:req.body.country,

 

    })

    try{

        const savedUser=await user.save();
        res.send({user:savedUser.idUser});
        // res.send(savedUser);

    }
    catch(err)
    {
        res.status(400).send(err);
    }

});


router.post('/login', async(req,res)=>{

const {error}=loginValidation(req.body)
if(error) return res.status(400).send(error.details[0].message);
// checking if the mail exists 
const user =await User.findOne({email:req.body.email})
if(!user)return res.status(400).send('Email or password is wrong');

// password is correct 
const validPass = await bcrypt.compare(req.body.password,user.password);
if(!validPass) return res.status(400).send('invalid password');

// res.send('Logged in !')


 
// create and assign a token 
//npm install jsonwebtoken
// process.env.JWT_EXP
const token=jwt.sign({idUser:user.idUser},process.env.TOKEN_SECRET);
// res.header('Authorization',  token).json({"token": token})
res.header('Authorization',  token).status(200).json({token:token});

// json({"token":token})

// 
// if i send json i need to parte in fronEnd in function callBack!!


// res.setHeader('Content-Type', 'application/json');

// registerd user 



// set it in an HTTP Only + Secure Cookie
// res.cookie("SESSIONID", token, {httpOnly:true, secure:true});
})

 


module.exports=router;