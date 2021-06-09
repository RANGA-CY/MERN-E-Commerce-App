import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

// @desc  fetch all products
// @route  GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.status(200).json(products)
})

// @desc  fetch single product
// @route  GET /api/products/:id
// @access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

// @desc  Delete a Product
// @route  DELETE /api/products/:id
// @access  private and admin only

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({
      message: 'product Removed',
    })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

// @desc  Create a Product
// @route  POST /api/products/
// @access  private and admin only

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Samle Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc  Update a Product
// @route  PUT /api/products/:id
// @access  private and admin only

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
}
