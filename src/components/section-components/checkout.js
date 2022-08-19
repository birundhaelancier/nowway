import React, { Component, useEffect, useState } from 'react';
import { ServiceProducts } from '../apiActions'
import  { ViewService_Cart,Remove_Service_Cart,AddService_Cart, PaymentSuccess } from '../../Redux/Action/allActions'
import { notification } from 'antd'
import { useDispatch,connect } from "react-redux";
import { Link } from 'react-router-dom'
import Form from './form'
import moment from 'moment'
 const CheckoutComp=(props)=> {
  const params = new URLSearchParams(props?.location?.search);
  const EditText = params.get('edit');
  const ser_image = params.get('image');
  const ser_name = params.get('ser_name');
  const serviceId =params.get('service')
  let dispatch=useDispatch()
  const [continuepay, setcontinue] = useState(false)
  const [Products,setProducts]=useState([])
  const [ViewCarts,setViewCarts]=useState([])
  const [service,setservice]=useState(false)
  const [CartId,setCartId]=useState([])
  const [qty,setqty]=useState([])
  const [Formvalues,setFormvalues]=useState({})
  const [payment,setpayment]=useState(false)
  const [Total_amt,setTotal_amt]=useState()
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
    props.handleClose()
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
  return (
    <div>
      {!continuepay && !payment ? (
        <>
        {Products.length>0 && <div className="service_pay2_parent">
            <img
              src={publicUrl + "assets/img/winner.jpg"}
              style={{ width: "38px" }}
            />
            <div>
              <label>
                Earn upto ₹1,200{" "}
                <img
                  src={publicUrl + "assets/img/cash.png"}
                  style={{ width: "20px", height: "20px" }}
                />{" "}
                NWcash on this order{" "}
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </label>
              <label>Apply on next order to get instant discount</label>
            </div>
          </div>}
          {Products.length>0? <div className="listing_services">
            {Products && Products.map((data) => {

              return (
                <div>
                  <img src={data.image} />
                  <div style={{ fontWeight: "600", fontSize: "20px" }}>
                    {data.name}
                  </div>
                  <div className="amt_ch">
                    {data.mrp==="0.00"?"":<del>₹{data.mrp}</del>}
                    <label>₹{data.price}</label>
                  </div>
                  <div className="discount_div">
                    <div>
                      <img
                        src={publicUrl + "assets/img/cash.png"}
                        style={{ width: "20px", height: "20px"}}
                      />
                      <span></span>
                      <span>Extra ₹{data.nwcash} NWcash discount</span>
                    </div>
                  </div>
                  <div className="service_con">
                  <span>
                  {data.description?
                  <>
                      {/* <i
                        class="fa fa-check"
                        style={{ color: "green", paddingRight: "10px" }}
                        aria-hidden="true"
                      ></i> */}
                      <div dangerouslySetInnerHTML={{__html:data.description}}></div>
                      </>
                      :""}
                    </span>
                    <div className="mt-2">
                    {CartId.includes(data.id)?
                    <button className={"btn_remove"} onClick={()=>Removecart(data.id)}>{"Remove"}</button>
                      :<button className={"btn_add"} onClick={()=>Addcart(data)}>{"Add"}</button>                      
                     }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>:
          <div style={{padding:"20px 0px"}}><img src={publicUrl+"assets/img/no-record.png"}/></div>
          }
        
          {Products.length>0 &&
          <div className='cart_div'>
            <div><label>Amount: ₹ {ViewCarts && ViewCarts[0]?.total}</label>
            <label>Items: {ViewCarts?.length>0 && ViewCarts[0]?.details?.length}</label>
            </div>

          <div className="cont_btn">
            <button className="" onClick={() => setcontinue(true)}>
              Continue
            </button>
          </div>
          </div>
           }
        </>
      ) : (
        payment?
        <>
          <div className="checkout_div">
            <div>
              <label>Service Date</label>
              <label>{moment(Formvalues.date).format("DD MMMM YYYY HH:mm")}</label>
              {/* <label>Change</label> */}
            </div>
            <div>
              <label>Address</label>
              <label>{Formvalues.address},{Formvalues.pincode}</label>
              {/* <label>Change</label> */}
            </div>
          </div>
          <div>
            <h5 style={{ margin: "10px 0px" }}>My Requirements</h5>
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
                {/* <div> */}
                <label>{data.product_name}</label>
                <label>Apply on next order to get instant discount</label>
                <div className="amt_ch">
                  <del>₹{data.product_price}</del>
                  <label>₹{data.price}</label>
                </div>
                {/* </div> */}
                {/* <div><input type="number"/></div> */}

                <div className="btn_items"><input type="number" style={{width:"70px",height:"35px",marginBottom:"0px",padding:"5px"}}  value={qty["value"+index]} onChange={(e)=>OnUpdate(e.target.value,data,index)}/>

                <button className={"btn_remove"} onClick={()=>Removecart(data.pid)}>{"Remove"}</button>
                </div>
              </div>
            </div>
            )})}
            </>
            )})}
            <div className="moreitems" onClick={()=>{props.handleClose()}}>
            {/* <Link to={`/service-details?edit=${EditText}&&image=${ser_image}&&ser_name=${ser_name}&&service=${serviceId}`}> */}
               Add more Items{" "}
               {/* </Link> */}
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
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

            <div className="service_pay2_parent">
              <img
                src={publicUrl + "assets/img/winner.jpg"}
                style={{ width: "38px" }}
              />
              <div>
                <label>
                  Earn upto ₹1,200{" "}
                  <img
                    src={publicUrl + "assets/img/cash.png"}
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                  NWcash on this order{" "}
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </label>
                <label>Apply on next order to get instant discount</label>
              </div>
            </div>
            <div className="btn-wrapper mt-0 " style={{ textAlign: "center" }}>
            {ViewCarts && ViewCarts.map((data)=>
              <button className="theme-btn-1 btn btn-block" onClick={()=>openPayModal()}>
                Pay ₹{data.total || 0} now
              </button>
            )}
            </div>
          </div>
        </>:
        continuepay && !payment ?<Form sub_services={props.sub_services} HandleSubmit={HandleSubmit} pay_service="pay"/>:""
      )}
      {/* checkoutend */}
    </div>
  )
}

const mapStateToProps = (state) =>
({
    ServiceCart:state.AllReducer.Service_Cart || [],
});
export default connect(mapStateToProps)(CheckoutComp);