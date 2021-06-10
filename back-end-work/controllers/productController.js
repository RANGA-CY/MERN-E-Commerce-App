import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

// @desc  fetch all products
// @route  GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : ''
  const count = await Product.count({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
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

// @desc  Create new Review
// @route  POST /api/products/:id/reviews
// @access  private

const CreateProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already Reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((total, item) => {
        return item.rating + total
      }, 0) / product.reviews.length
    await product.save()
    res.status(201).json({
      message: 'Review added',
    })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

// @desc  Get top rated products
// @route  GET /api/products/top
// @access  public

const GetTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  CreateProductReview,
  GetTopProducts,
}
