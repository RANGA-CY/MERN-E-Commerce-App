import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { Container } from 'react-bootstrap';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProfileScreen from './screen/ProfileScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/register' exact component={RegisterScreen}></Route>
          <Route path='/login' exact component={LoginScreen}></Route>
          <Route path='/' exact component={HomeScreen}></Route>
          <Route path='/profile' exact component={ProfileScreen}></Route>
          <Route path='/shipping' exact component={ShippingScreen}></Route>
          <Route path='/payment' exact component={PaymentScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/product/:id' exact component={ProductScreen}></Route>
          <Route path='/cart/:id?' exact component={CartScreen}></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
