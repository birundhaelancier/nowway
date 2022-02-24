import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'antd/dist/antd.css';
import store from './Redux/Store/store'
// import { store } from './Redux/Store';
import { Provider } from 'react-redux';

ReactDOM.render(
//   <React.StrictMode>
    <Provider  store = {store}>
      <App />
   </Provider>
//   </React.StrictMode>
  ,
  document.getElementById('quarter')
);
