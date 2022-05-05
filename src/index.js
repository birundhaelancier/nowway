import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'antd/dist/antd.css';
// import { store } from './Redux/Store';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import store from "./Redux/Store/store";
// import PullToRefresh from 'react-simple-pull-to-refresh';
ReactDOM.render(
  <Provider store={store}>
   <App /> 
  </Provider>,
  document.getElementById('quarter')
);
