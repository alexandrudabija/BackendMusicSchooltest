const express =require('express');
const connectDB = require('./db/connection');
const app = express();
const dotenv = require('dotenv');

// Import Routes 
const authRoute = require('./routes/auth');
const user= require('./routes/user')
const product=require('./routes/product');
const order=require('./routes/order');
const cors = require('cors');


app.use(cors({
  origin: "https://alexandrudabija.github.io",
  allowedHeaders: ["Content-Type", "Authorization", "noauth"]
}));


dotenv.config();



// connect to Db
connectDB();


// Middlewares
app.use(express.json());


// Route Middlewares
app.use('/api/auth',authRoute);
app.use('/api/userProfile',user);
app.use('/api/order',order);
app.use('/api/product',product);


const Port = process.env.Port || 3000;

app.listen(Port);