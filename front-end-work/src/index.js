import React from 'react';
import { Provider } from 'react-redux';
import store from './strore.js';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
