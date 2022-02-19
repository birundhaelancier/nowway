import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'antd/dist/antd.css';
// import { store } from './Redux/Store';
import { Provider } from 'react-redux';

ReactDOM.render(
//   <React.StrictMode>
    // <Provider>
      <App />
    // </Provider>
//   </React.StrictMode>
  ,
  document.getElementById('quarter')
);
