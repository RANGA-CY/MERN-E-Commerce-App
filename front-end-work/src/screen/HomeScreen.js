import React, { useState, useEffect } from 'react';
// import products from '../products';
import axios from 'axios';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios('/api/products');
    console.log(data);
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} key={product._id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
