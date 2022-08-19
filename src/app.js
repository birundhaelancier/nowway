import React, { useEffect, useState,Suspense  } from "react";
import ReactDOM from "react-dom";
// import {
//   HashRouter as Router,
//   Route,
//   Switch,
// } from "react-router-dom";

import {Router, Route,BrowserRouter,Switch, HashRouter} from 'react-router-dom'
import axios from "axios";

import HomeV7 from "./components/home-v7";
import CartPage from './components/CartComp'

// import About from './components/about';
import Service from "./components/service";
import ServiceDetails from "./components/service-details";
// import Portfolio from './components/portfolio';
// import PortfolioV2 from './components/portfolio-v2';
import PortfolioDetails from "./components/portfolio-details";
import Team from "./components/team";
import TeamDetails from "./components/team-details";
import Faq from "./components/faq";
import ComingSoon from "./components/coming-soon";
import Error from "./components/404";
import Location from "./components/location";

import Shop from "./components/shop";
import ShopGrid from "./components/shop-grid";
import ProdductDetails from "./components/product-details";
import ShopLeftSidebar from "./components/shop-left-sidebar";
import ShopRightSidebar from "./components/shop-right-sidebar";

import BlogGrid from "./components/blog-grid";
import BlogLeftSidebar from "./components/blog-left-sidebar";
import BlogRightSidebar from "./components/blog-right-sidebar";
import Blog from "./components/blog";

import BlogDetails from "./components/blog-details";
import Contact from "./components/contact";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import MyAccount from "./components/my-account";
import Login from "./components/login";
import Register from "./components/register";
import AddListing from "./components/add-listing";
import Wishlist from "./components/wishlist";
import OrderTracking from "./components/order-tracking";
// import History from './components/history';
import Advertisement from "./components/section-components/advertisement";
import OwnwerPlan from "./components/ownerPlan";
import Wallet from "./components/wallet";
import RefundPolicy from "./components/section-components/RefundPollicy";
import PrivatePolicy from "./components/private-policy";
import TermCondition from "./components/terms-condition";
import ScrollToTop from "./components/section-components/ScrollTop";
import MediaComp from "./components/section-components/MediaUpload";
import { AuthContext } from './context/auth' 
import pMinDelay from 'p-min-delay';
import { Box,CircularProgress } from "@mui/material";
import store from "./Redux/Store/store";
import { Provider } from "react-redux";
// import PullToRefresh from "rmc-pull-to-refresh";
import PullToRefresh from 'react-simple-pull-to-refresh';
import SeoPage from "./components/global-components/Seopage";
import Loading from './loading'
import {Helmet} from "react-helmet";
const App = () => {
 
  const [loading, setloading] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [refresh,setrefresh] = React.useState(false);

    useEffect(() => {
     
      async function fetchMyAPI() {
         axios({
          method: "POST",
          url: "https://nowway.in/$panel/api/auth_login",
          data: {
            email: "nowway",
            password: "12345678",
          },
        }).then((response) => {
          localStorage.setItem(
            "Token",JSON.stringify(response.data.Response.token))
          // setTimeout(()=>{
            setloading(true)
          // },500)  
        
        });
      }
      fetchMyAPI()

     
    }, [])
 
 
  return (
    <>
    {/* <PullToRefresh onRefresh={handleRefresh}> */}
    {/* <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>   */}
    {!loading ? 
       <Loading/>:
       
          <BrowserRouter basename="/web_demo">
            <ScrollToTop />
            <Switch>
              <Route exact path="/" component={HomeV7} />
              <Route path="/service" exact component={Service} />
              <Route path="/cart"  exact component={CartPage}/>
              <Route path="/service-details/:code?" exact component={ServiceDetails} />
              <Route path="/portfolio-details" exact component={PortfolioDetails} />
              <Route path="/team" exact component={Team} />
              <Route path="/team-details" exact component={TeamDetails} />
              <Route path="/faq" exact component={Faq} />
              <Route path="/coming-soon" exact component={ComingSoon} />
              <Route path="/404" exact component={Error} />
              <Route path="/location" exact component={Location} />
              <Route path="/shop" exact component={Shop} />
              <Route path="/shop-grid" component={ShopGrid} />
              <Route path="/shop-left-sidebar" component={ShopLeftSidebar} />
              <Route
                path="/shop-right-sidebar/:type?/:apartment?/:city?"
                component={ShopRightSidebar}
              />
              <Route path="/advertisement" component={Advertisement} />
              <Route path="/plan" component={OwnwerPlan} />
              <Route path="/wallet" component={Wallet} />
              <Route path="/policy" exact component={PrivatePolicy} />
              <Route path="/terms" exact component={TermCondition} />
              <Route path="/media" component={MediaComp} />

              <Route path="/product-details/:product_id?" component={ProdductDetails} />
              <Route path="/blog-grid" component={BlogGrid} />
              <Route path="/blog-left-sidebar" component={BlogLeftSidebar} />
              <Route path="/blog-right-sidebar" component={BlogRightSidebar} />
              <Route path="/blog" component={Blog} />

              <Route path="/blog-details" component={BlogDetails} />
              <Route path="/contact" component={Contact} />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/my-account" component={MyAccount} />
              <Route path="/login" component={Login} />
              <Route
                path="/register/:userid?/:mobilenumber?"
                component={Register}
              />
              <Route path="/add-listing/:id?" component={AddListing} />
              <Route path="/wishlist" component={Wishlist} />
              <Route path="/order-tracking" component={OrderTracking} />
              <Route path="/history" component={History} />
              <Route path="/aboutus" component={RefundPolicy} />
            </Switch>
      </BrowserRouter>
         }
          {/* </AuthContext.Provider> */}
        {/* </PullToRefresh> */}
    </>
  );
};

export default App;
