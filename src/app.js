import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';

import HomeV7 from './components/home-v7';
import HomeV8 from './components/home-v8';
import HomeV9 from './components/home-v9';
import HomeV10 from './components/home-v11';

import About from './components/about';
import Service from './components/service';
import ServiceDetails from './components/service-details';
import Portfolio from './components/portfolio';
import PortfolioV2 from './components/portfolio-v2';
import PortfolioDetails from './components/portfolio-details';
import Team from './components/team';
import TeamDetails from './components/team-details';
import Faq from './components/faq';
import ComingSoon from './components/coming-soon';
import Error  from './components/404';
import Location  from './components/location';

import Shop from './components/shop';
import ShopGrid from './components/shop-grid';
import ProdductDetails from './components/product-details';
import ShopLeftSidebar from './components/shop-left-sidebar';
import ShopRightSidebar from './components/shop-right-sidebar';

import BlogGrid from './components/blog-grid';
import BlogLeftSidebar from './components/blog-left-sidebar';
import BlogRightSidebar from './components/blog-right-sidebar';
import Blog from './components/blog';

import BlogDetails from './components/blog-details';
import Contact from './components/contact';
import Cart from './components/cart';
import Checkout from './components/checkout';
import MyAccount from './components/my-account';
import Login from './components/login';
import Register from './components/register';
import AddListing from './components/add-listing';
import Wishlist from './components/wishlist';
import OrderTracking from './components/order-tracking';
import History from './components/history';
import Advertisement from './components/section-components/advertisement';
import OwnwerPlan from './components/ownerPlan';
import Wallet from './components/wallet';
import RefundPolicy from './components/section-components/RefundPollicy'
import PrivatePolicy from './components/private-policy';
import TermCondition from './components/terms-condition';
import ScrollToTop from './components/section-components/ScrollTop'
import MediaComp from './components/section-components/MediaUpload'
import store from './Redux/Store/store'
import { Provider } from 'react-redux';
const App=()=>{
  const [loading,setloading]=useState(false)
    // useEffect(async () => {
     
    //   }, []);
    //   useEffect(() => {
    //     async function fetchMyAPI() {
    //        axios({
    //         method: "POST",
    //         url: "https://nowway.in/$panel/api/auth_login",
    //         data: {
    //           email: "nowway",
    //           password: "12345678",
    //         },
    //       }).then((response) => {
    //          localStorage.setItem(
    //           "Token",JSON.stringify(response.data.Response.token))
    //       });
    //     }
    //     fetchMyAPI()
    //   }, [])
    async function fetchData() {
      localStorage.removeItem("Token")
       try{
         await axios.post('https://nowway.in/$panel/api/auth_login',{
          email: "nowway",
          password: "12345678",
        }).then((res)=>{
            console.log("reeee",res)
            localStorage.setItem("Token",JSON.stringify(res.data.Response.token))
           setloading(true)
        })
        // const data=await Response
      }catch{
        
      }

       }
       
       useEffect(() => {
        fetchData()
       console.log(loading,"dddddddddddddd")
       }, []);
    return(
      <>
      {loading===true &&
    <Provider  store = {store}>
  
        <HashRouter>
               <ScrollToTop/>
            <Switch>
                <Route exact  path="/" component={HomeV7} />
                {/* <Route path="/home-v2" component={HomeV2} />
                <Route path="/home-v3" component={HomeV3} />
                <Route path="/home-v4" component={HomeV4} />
                <Route path="/home-v5" component={HomeV5} />
                <Route path="/home-v6" component={HomeV6} />
                <Route path="/home-v7" component={HomeV7} />
                <Route path="/home-v8" component={HomeV8} />
                <Route path="/home-v9" component={HomeV9} />
                <Route path="/home-v10" component={HomeV10} /> */}

                <Route path="/about" component={About} />
                <Route path="/service" component={Service} />
                <Route path="/service-details" component={ ServiceDetails } />
                <Route path="/portfolio" component={ Portfolio } />
                <Route path="/portfolio-v2" component={ PortfolioV2 } />
                <Route path="/portfolio-details" component={ PortfolioDetails } />
                <Route path="/team" component={ Team } />
                <Route path="/team-details" component={ TeamDetails } />
                <Route path="/faq" component={ Faq } />
                <Route path="/coming-soon" component={ ComingSoon } />
                <Route path="/404" component={ Error } />
                <Route path="/location" component={ Location } />
                <Route path="/shop" component={ Shop } />
                <Route path="/shop-grid" component={ ShopGrid } />
                <Route path="/shop-left-sidebar" component={ ShopLeftSidebar } />
                <Route path="/shop-right-sidebar/:apartment?/:city?/:type?" component={ ShopRightSidebar } />
                <Route path="/advertisement" component={ Advertisement } />
                <Route path="/plan" component={OwnwerPlan} />
                <Route path="/wallet" component={Wallet} />
                <Route path="/policy" component={PrivatePolicy} />
                <Route path="/terms" component={TermCondition} />
                <Route path="/media" component={MediaComp} />
            


                <Route path="/product-details" component={ ProdductDetails } />
                <Route path="/blog-grid" component={ BlogGrid } />
                <Route path="/blog-left-sidebar" component={ BlogLeftSidebar } />
                <Route path="/blog-right-sidebar" component={ BlogRightSidebar } />
                <Route path="/blog" component={ Blog } />


                <Route path="/blog-details" component={ BlogDetails } />
                <Route path="/contact" component={ Contact } />
                <Route path="/cart" component={ Cart } />
                <Route path="/checkout" component={ Checkout } />
                <Route path="/my-account" component={ MyAccount } />
                <Route path="/login" component={ Login } />
                <Route path="/register/:userid?/:mobilenumber?" component={ Register } />
                <Route path="/add-listing/:id?/" component={ AddListing } />
                <Route path="/wishlist" component={ Wishlist } />
                <Route path="/order-tracking" component={ OrderTracking } />
                <Route path="/history" component={ History } />
                <Route path="/aboutus" component={ RefundPolicy } /> 
                
             </Switch>
        </HashRouter>
   </Provider>

}
        </>
)
}

export default App;


