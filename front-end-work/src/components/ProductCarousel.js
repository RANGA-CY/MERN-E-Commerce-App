import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions.js'
const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTop = useSelector((state) => state.productTop)
  const { products, loading, error } = productTop
  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((item) => {
        return (
          <Carousel.Item key={item._id}>
            <Link to={`/products/${item._id}`}>
              <Image src={item.image} alt={item.name} fluid></Image>
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {item.name} {item.price}
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default ProductCarousel
