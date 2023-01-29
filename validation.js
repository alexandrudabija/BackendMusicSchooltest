// Validation
const Joi = require('@hapi/joi');
// Register Validation
const registerValidation = data => {

    const schema=Joi.object(


            { 
              
                firstname:Joi.string().min(2).required(),
                lastname:Joi.string().min(2).required(),
                email:Joi.string().min(6).required().email(),
                password:Joi.string().min(6).required(),  
                orders:Joi.array().allow(null),
                dateRegistration:Joi.date().allow(null),
                yearOfBirth:Joi.date().allow(null),
                country:Joi.string().allow(null)
            }
        )

        
  return schema.validate(data)
}


// login Validation
const loginValidation = data => {

    const schema=Joi.object(


            { 
             
                email:Joi.string().min(6).required().email(),
                password:Joi.string().min(6).required(),  
               
            }
        )


        return schema.validate(data)
} 


module.exports.registerValidation=registerValidation;

module.exports.loginValidation=loginValidation;