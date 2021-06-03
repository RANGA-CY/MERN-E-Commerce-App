const express = require('express');
const products = require('./products');
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('hello world');
});
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.status(200).json(product);
});
app.listen(5000, console.log('server running on port 5000'));
