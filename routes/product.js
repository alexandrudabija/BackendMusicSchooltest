const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const  route = express.Router();
const ObjectId= require('mongoose').Types.ObjectId;


route.post('/',async (req,res)=>{
            
                const product = new Order(
                    {
                     
                        idProduct: req.body.idProduct,
                        nameProduct: req.body.nameProduct,
                        brandProduct: req.body.brandProduct,
                        priceProduct: req.body.priceProduct,
                        imgProduct: req.body.imgProduct,
                        quantityProduct: req.body.quantityProduct,
                        stockProduct:req.body.stockProduct,

                    }
                )

          try {

                const productModel = await product.save();
              res.json(productModel)


          }catch (error)
          {
            res.send(`some error occured => ${error}}`)



          }
                


            })


            route.get('/',async(req,res)=>{

                try{
                 
                const product= await Product.find()
                res.status(200).json(product)
          
                }
                catch (error)
                {
    
                res.send(`some error occured => ${error}}`)
                }
    
                })



                 
             
      

                route.get('/:id',async(req,res)=>{

      
       
 if (!ObjectId.isValid(req.params.id))
 return res.status(400).send(`No record with give id L ${req.params.id}`);

 const id = await  Product.findById(req.params.id);
 res.json(id)
                  }) 


                  route.delete('/:id',async(req,res)=>{
                    
               const deleteOne = await     Product.remove({_id:req.params.id})

                       res.json(deleteOne);
                  })


route.put('/:id', async(req,res)=>{

try {

 await Product.findByIdAndUpdate(  {_id:req.params.id  },
    
  {
     $set:{
      
  
        idProduct: req.body.idProduct,
        nameProduct: req.body.nameProduct,
        brandProduct: req.body.brandProduct,
        priceProduct: req.body.priceProduct,
        imgProduct: req.body.imgProduct,
        quantityProduct: req.body.quantityProduct,
        stockProduct:req.body.stockProduct,
    
    }
 
  }

   


  
  );
res.send("Success")

}catch (err)
{
  res.send(err);
}

//
})


module.exports=route;