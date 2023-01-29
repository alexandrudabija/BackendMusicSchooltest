const mongoose = require('mongoose');



const connectDB = async()=>
{

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=> console.log("Connect to db !")
);
// This code is checking if the collection called "counters" already exists in the database, If the collection does not exist, the code creates it.
mongoose.connection.on("open", async function(){
    try {
        await mongoose.connection.db.collection("CounterCustomer").stats();
        await mongoose.connection.db.collection("CounterOrders").stats();

    } catch (error) {
        if (error.codeName === 'NamespaceNotFound') {
            mongoose.connection.createCollection("CounterOrders", {
                capped: false,
                autoIndexId: true,
            });

            mongoose.connection.createCollection("CounterCustomer", {
                capped: false,
                autoIndexId: true,
            });
        }
    }
});
}
module.exports = connectDB;