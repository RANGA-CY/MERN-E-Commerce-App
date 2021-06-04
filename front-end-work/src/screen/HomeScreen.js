import React, { useEffect } from 'react';
// import products from '../products';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions.js';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.productList;
  });
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader>loading...</Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col sm={12} md={6} lg={4} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
