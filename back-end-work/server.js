import express from 'express';
import dotenv from 'dotenv';
import products from './products.js';
import connectDB from './config/db.js';
import colors from 'colors';
dotenv.config();
connectDB();
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('hello people');
});
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.status(200).json(product);
});
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
