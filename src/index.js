import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'antd/dist/antd.css';
// import { store } from './Redux/Store';
import { Provider } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.render(
//   <React.StrictMode>
    // <Provider>
      <App />
    // </Provider>
//   </React.StrictMode>
  ,
  document.getElementById('quarter')
);
