const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes=require('./routes/user');
const cookieParser = require('cookie-parser');
const productRoutes=require('./routes/product');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({
  origin: 'https://ecommerce-afaf.onrender.com', // Replace with your frontend domain
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));
app.use(cookieParser());

let DB_URL = process.env.DB_URL;
async function main() {
  await mongoose.connect(DB_URL);
  console.log('Connected to database');
}
main().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users',userRoutes);
app.use('/products',productRoutes);


module.exports = app;