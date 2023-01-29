const router = require('express').Router();
const verify = require('./verifyToken');
 const User= require('../models/User.js')
 const bcrypt= require('bcryptjs');

router.get('/user',verify,async(req,res)=>{

    try{
      

// we receive from token the idUser !
//we  req.user.idUser receive form verifyToken , the user is an object what have adUser property
const user= await User.findOne({"idUser":req.user.idUser})

res.status(200).json(user)


    }
    catch (error)
    {

    res.send(`some error occured => ${error}}`)
    }
 
    })
 


    router.patch('/changePassword', verify, async (req, res) => {
        try {
          // Find the user by the id sent in the request body
          const user = await User.findOne({idUser:req.user.idUser});

        
        // compare to verify the old password if is correct   , respect correct order :new password and old  !
          const validPass = await bcrypt.compare(req.body.oldPassword,user.password);
          if(!validPass) return res.status(400).send('invalid old password');

         const salt =await bcrypt.genSalt(10); //   hashing
          const hashedPassword = await bcrypt.hash(req.body.newPassword,salt)

          // Update the password field with the new password
 
          user.password = hashedPassword;


        
 
          // Save the updated user to the database
          await user.save();

          // Send a response indicating that the update was successful
          res.send({ message: 'Password successfully updated' });
        } catch (err) {
          res.send(err);
        }
      });


      router.patch('/changeEmail', verify, async (req, res) => {
        try {

//    checking email the user is already in  the database 
const emailExist =await User.findOne({email:req.body.email})

if(emailExist)return res.status(400).send('Email alredy exist');


          // Find the user by the id sent in the request body
          const user = await User.findOne({idUser:req.user.idUser});

        
          // Update the password field with the new email

          user.email = req.body.email;


        

          // Save the updated user to the database
          await user.save();
 
          // Send a response indicating that the update was successful
          res.send({ message: 'email successfully updated' });
        
        } catch (err) {
          res.send(err);
        }
      });


    module.exports=router;