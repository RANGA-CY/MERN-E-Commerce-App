import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screen/HomeScreen'
import ProductScreen from './screen/ProductScreen'
import { Container } from 'react-bootstrap'
import CartScreen from './screen/CartScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProfileScreen from './screen/ProfileScreen'
import ShippingScreen from './screen/ShippingScreen'
import PaymentScreen from './screen/PaymentMethodScreen'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreen from './screen/OrderScreen'
import UserListScreen from './screen/UserListScreen'
import UserEditScreen from './screen/UserEditScreen'
import ProductListScreen from './screen/ProductListScreen'
import ProductEditScreen from './screen/ProductEditScreen'
import OrderListScreen from './screen/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/register' exact component={RegisterScreen}></Route>
          <Route path='/login' exact component={LoginScreen}></Route>
          <Route path='/' exact component={HomeScreen}></Route>
          <Route path='/page/:pageNumber' exact component={HomeScreen}></Route>
          <Route
            path='/search/:keyword/page/:pageNumber'
            exact
            component={HomeScreen}
          ></Route>
          <Route path='/search/:keyword' exact component={HomeScreen}></Route>
          <Route path='/profile' exact component={ProfileScreen}></Route>

          <Route path='/shipping' exact component={ShippingScreen}></Route>
          <Route path='/orders/:id' exact component={OrderScreen}></Route>
          <Route path='/payment' exact component={PaymentScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/product/:id' exact component={ProductScreen}></Route>
          <Route path='/cart/:id?' exact component={CartScreen}></Route>
          <Route
            path='/admin/userlist'
            exact
            component={UserListScreen}
          ></Route>
          <Route
            path='/admin/user/:id/edit'
            exact
            component={UserEditScreen}
          ></Route>
          <Route
            path='/admin/productlist'
            exact
            component={ProductListScreen}
          ></Route>
          <Route
            path='/admin/productlist/:pageNumber'
            exact
            component={ProductListScreen}
          ></Route>
          <Route
            path='/admin/product/:id/edit'
            exact
            component={ProductEditScreen}
          ></Route>
          <Route
            path='/admin/orderlist'
            exact
            component={OrderListScreen}
          ></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
