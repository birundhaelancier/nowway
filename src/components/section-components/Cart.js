import React, { Component, useEffect, useState } from 'react';
import { ServiceProducts } from '../apiActions'
import  { ViewService_Cart,Remove_Service_Cart,AddService_Cart, PaymentSuccess } from '../../Redux/Action/allActions'
import { notification } from 'antd'
import { useDispatch,connect } from "react-redux";
import { Link } from 'react-router-dom'
import Form from './form'
import moment from 'moment'
import { useLocation } from 'react-router-dom';
 const CartComp=(props)=> {
  const params = new URLSearchParams(props?.location?.search);
  let dispatch=useDispatch()
  let location=useLocation()
  const [continuepay, setcontinue] = useState(false)
  const [Products,setProducts]=useState([])
  const [ViewCarts,setViewCarts]=useState([])
  const [service,setservice]=useState(false)
  const [CartId,setCartId]=useState([])
  const [qty,setqty]=useState([])
  const [Formvalues,setFormvalues]=useState({})
  const [payment,setpayment]=useState(false)
  const [disble, setdisble] = useState(true);
  let publicUrl = process.env.PUBLIC_URL + "/"

  const Addcart=(value)=>{
    dispatch(AddService_Cart(value)).then((data)=>{
   
})
  }
  const OnUpdate=(data,value,index)=>{
    setdisble(false)
    setqty(data)
    setqty({
      ...qty,
      ["value"+index]: data,
    });
    dispatch(AddService_Cart(value,data)).then((data)=>{
  })
  }
  useEffect(()=>{
    ServiceProducts(props.sub_serv).then((res)=>{
        setProducts(res.Response)
        setservice(true)
   })  
  },[props.sub_serv])
  useEffect(()=>{
    dispatch(ViewService_Cart())
  },[])
  useEffect(()=>{
  setViewCarts(props.ServiceCart.Response)

  },[props.ServiceCart])
  useEffect(()=>{
    let arraydd=[]
    let cartIds=[]
    ViewCarts && ViewCarts.map((data)=>{
      arraydd=data.details
    })
    arraydd && arraydd.map((res)=>{
      cartIds.push(res.pid)     
    })
    setCartId(cartIds)
  },[ViewCarts])

  const options = {
    key: 'rzp_live_ApPVCvIUh5z0pv',
    amount:ViewCarts && ViewCarts[0]?.total*100, //  = INR 1
    name: 'Now Way',
    description: 'Pay Money',
    image:publicUrl+"assets/img/logonow.png",
    handler: function(response) {
      dispatch(PaymentSuccess(Formvalues,ViewCarts&&ViewCarts[0],props.ser_id,response.razorpay_payment_id,"Success")).then(()=>{
        setcontinue(false)
        setpayment(false)
      })
    },
    prefill: {
        name:Formvalues.name,
        contact:Formvalues.mobile,
        email:Formvalues.email
    },
    notes: {
        address:Formvalues.address
    },
    theme: {
        color: 'green',
        hide_topbar: true
    }
  };
  const openPayModal = () => {
    location.pathname!=="/cart" && props.handleClose()
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    }

useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
}, []);
const Removecart=(id)=>{
   dispatch(Remove_Service_Cart(id)).then(()=>{
   })
}
const HandleSubmit=(data,formValues)=>{
  setcontinue(false)
  setpayment(data)
  setFormvalues(formValues)
}
console.log(ViewCarts,"ViewCarts")
  return (
    <div>
      {
      //  payment?payment:location.pathname==="/cart"?
      !continuepay ?
        <>
       
          <div>
            <h5 style={{ margin:location.pathname==="/cart"? "10px":"10px 0px" }}>My Requirements</h5>
            {ViewCarts && ViewCarts.map((res)=>{
             return(
               <>
               {res.details.map((data,index)=>{
                  if(disble){
                      qty["value"+index]=data.qty
                  }
               return(
            <div className="service_pay_parent">
              <img
                src={data.image}
                style={{ width: "100px", height: "100px",objectFit:"cover" }}
              />
              <div>
                <label>{data.product_name}</label>
                <label>Apply on next order to get instant discount</label>
                <div className="amt_ch">
                  <del>₹{data.product_price}</del>
                  <label>₹{data.price}</label>
                </div>

                <div className="btn_items"><input type="number" style={{width:"70px",height:"35px",marginBottom:"0px",padding:"5px"}}  value={qty["value"+index]} onChange={(e)=>OnUpdate(e.target.value,data,index)}/>

                <button className={"btn_remove"} onClick={()=>Removecart(data.pid)}>{"Remove"}</button>
                </div>
              </div>
            </div>
            )})}
            </>
            )})}
          
            {ViewCarts && ViewCarts.map((data)=>
            <div className="payment_detal">
              <div>
                <label> Amount</label>
                <label>₹{data.sub_total}</label>
              </div>
              <div>
                <label>Convenience Charge</label>
                <label>₹ +{data.conv_charge}</label> 
              </div>
              <div>
                <label>NWcash Discount</label>
                <label>
                  <i class="fa fa-info-circle" aria-hidden="true"></i> ₹ -{data.nwcash}
                </label>
              </div>
              <div>
                <label>Total Amount</label>
                <label>₹{data.total}</label>
              </div>
            </div>
            )}


            <div className="btn-wrapper mt-0 " style={{ textAlign: "center" }}>
            {ViewCarts && ViewCarts.map((data)=>
              <button className="theme-btn-1 btn btn-block" onClick={()=>setcontinue(true)}>
                {/* Pay ₹{data.total || 0} now */}
                Continue
              </button>
            )}
            </div>
          </div>
        </>
        :<Form sub_services={props.sub_services} HandleSubmit={HandleSubmit} pay_service="pay" page="cart"/>
      }
    </div>
  )
}

const mapStateToProps = (state) =>
({
    ServiceCart:state.AllReducer.Service_Cart || [],
});
export default connect(mapStateToProps)(CartComp);