import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  productListReducer,
  productDetailsReducer,
} from './reducer/productReducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
