import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import Modal from '../Model';
import { AddSubServiceEnquiry,GetTime_Slot,GetLocations } from '../apiActions/index';
import { ViewService_Cart } from '../../Redux/Action/allActions'
import { notification,DatePicker } from "antd";
import SelectInput from '../Select';
import moment from 'moment'
import './service.scss'
import Checkout from './checkout'
import Swal from 'sweetalert2'
import { useDispatch,connect } from 'react-redux';
import { PaymentSuccess } from '../../Redux/Action/allActions'
const Form = ({ sub_services, ser_image,sub_serv,HandleSubmit,pay_service,handleClose,service,ServiceCart,ser_id,page}) => {
	
	let history = useHistory()
	let dispatch=useDispatch()
	let publicUrl = process.env.PUBLIC_URL + '/'
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [continuepay,setcontinue]=useState(false)
	const [location,setLocation]=useState([])
	const [mobileErr, setMobileErr] = useState(false)
	const [locatErr,setlocatErr]=useState(false)
	// const [sub_serv, setSub_serv] = useState()
	const [TimeSlots,setTimeSlots]=useState([])
	const initialValues = {
		name: "",
		mobile: "",
		place: "",
		date:"",
		time:"",
		email:"",
		address:"",
		pincode:""
	};
	const [values, setValues] = useState(initialValues);

	const handleChange = (e,key) => {	
		if(key==="place"){
			setlocatErr("")
		}
		if(key==="date" || key==="time" || key==="place"){
			setValues({
				...values,
				[key]: e,
			});	
		}else{
			const { name, value } = e.target;
		if (name === "mobile") {
			if (value.length !== 10) {
				setMobileErr(true)
			} else {
				setMobileErr(false)
			}
		}
			setValues({
				...values,
				[name]: value,
			});
		}
	}
	const submitForm = async (e) => {
		e.preventDefault();
		if(JSON.parse(localStorage.getItem("user_id"))){
		if(values.place){	
		pay_service!=="pay"?AddSubServiceEnquiry(values, sub_serv?.id).then((data) => {
			if (data.Status === "Success") {
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: data.Message,
				})
				handleClose()
				handleCancel()
				setIsModalVisible(false)
				
			} else {
				Swal.fire({
					title: 'Failed!',
					icon: 'error',
					text: data.Message,
				})
			}
		}):
		openPayModal()
		pay_service==="pay"&&HandleSubmit(true,values)
	 }
	 else{
		 setlocatErr("Please select locaion")
	 }
	}else{
		history.push("/login")
	}
	}


	const handleCancel = () => {
		Object.keys(initialValues).map((data) => {
			values[data] = ""
		})
		setValues((prevState) => ({
			...prevState,
		}));
	}




	useEffect(()=>{
		GetLocations().then((res)=>{
			 setLocation(res.Response)
		})
		GetTime_Slot().then((res)=>{
			let Data=[]
			res.Response.map((data,index)=>{
              Data.push({id:index+1,name:data.from+" "+"to"+" "+data.to})
			})
			setTimeSlots(Data)
		})
	},[])
	const [Products,setProducts]=useState([])
	const [ViewCarts,setViewCarts]=useState([])
	// const [service,setservice]=useState(false)
	const [CartId,setCartId]=useState([])
	const [qty,setqty]=useState([])
	const [Formvalues,setFormvalues]=useState({})
	const [payment,setpayment]=useState(false)
	const [disble, setdisble] = useState(true);
  

	useEffect(()=>{
	  dispatch(ViewService_Cart())
	},[])
	useEffect(()=>{
	setViewCarts(ServiceCart.Response)
  
	},[ServiceCart])
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
		dispatch(PaymentSuccess(values,ViewCarts&&ViewCarts[0],ser_id,response.razorpay_payment_id,"Success")).then(()=>{
		  setcontinue(false)
		  setpayment(false)
		})
	  },
	  prefill: {
		  name:values.name,
		  contact:values.mobile,
		  email:values.email
	  },
	  notes: {
		  address:values.address
	  },
	  theme: {
		  color: 'green',
		  hide_topbar: true
	  }
	};
	const openPayModal = () => {
	//   location.pathname!=="/cart" && props.handleClose()
	  var rzp1 = new window.Razorpay(options);
	  rzp1.open();
	  }
  
  useEffect(() => {
	const script = document.createElement('script');
	script.src = 'https://checkout.razorpay.com/v1/checkout.js';
	script.async = true;
	document.body.appendChild(script);
  }, []);


  console.log(ViewCarts,"ViewCarts")
	return (
		<>
        	{/* <div className="ltn__quick-view-modal-inner">
					{/* <div className="col-lg-12 text-center modalHeading"></div> */}
					<div className="container">
						<div className="row">
						{pay_service!="pay"&&<div className="col-lg-5 text-center">
								<div className="account-create text-start ">
									<img className='homeimage' src={sub_serv?.images} />
									<div className='listed'>
										{/* <div className="text-start">
											<h6 className="section-titles">{sub_serv?.name}</h6>
										</div> */}
										<ul>
											<div style={{color:"#333",fontSize:"16px",fontWeight:"500"}}dangerouslySetInnerHTML={{ __html: sub_serv?.description }}></div>
										</ul>
									</div>
								</div>
							</div>}
							<div className={`col-lg-${pay_service!="pay"?7:12} text-center formShow`}>
								<div className="service_addnew">
									<form className="form-input-box" onSubmit={(e) => submitForm(e)}>
								
									    <div className="range_pick" style={{marginTop:"10px"}}>
										<SelectInput  dropdown={location} placeholder={"Select City*"} value={values.place} changeData={(e) => handleChange(e,"place")}/>
										{locatErr && <div className='errMsgmodel'>{locatErr}</div>}
										</div>
										{values.place?
										<>
											<div className="row">
                                   <div className="col-md-6">
								   <input type="text" name="name" value={values.name} onChange={(e) => handleChange(e)} required placeholder="Name*" />
									
                                    </div>
									<div className="col-md-6">
									<input type="number" name="mobile" value={values.mobile} onChange={(e) => handleChange(e)} required placeholder="Mobile Number*" />
										{mobileErr && <div className='errMsgmodel'>Mobile Number should be 10 digit only</div>}
									</div>
									</div>
										{/* <input type="text" name="address" value={values.address} onChange={(e) => handleChange(e)} required placeholder="Address*" /> */}
										<div className="input-item input-item-textarea ltn__custom-icon">
                                            <textarea required name={"address"} value={values.address} onChange={(e) => handleChange(e)} placeholder="Address*" defaultValue={""} />
                                        </div>
									<div className="row">

										<div className="col-md-6">
										<input type="number" name="pincode" value={values.pincode} onChange={(e) => handleChange(e)} required placeholder="Pincode*" />
										</div>
										<div className="col-md-6">
										<input type="email" name="email" value={values.email} onChange={(e) => handleChange(e)} required placeholder="Email*" />
										</div>
										</div>
										<div className="row">

                                    <div className="col-md-6">
										<div className="range_pick"><DatePicker  format="DD-MM-YYYY" disabledDate={(current) => current.isBefore(moment())} value={values.date} onChange={(e) => handleChange(e,"date")}/></div>
										</div>
										<div className="col-md-6">
										<div className="range_pick">
										<SelectInput  dropdown={TimeSlots} placeholder={"Time"} value={values.time} changeData={(e) => handleChange(e,"time")}/>
										</div>
										</div>
										</div>
										</>:null
                                         }
										 {page!=="cart"?
										<div className="btn-wrapper mt-0 ">
											<button className="theme-btn-1 btn btn-block"  style={{marginTop:values.place?"0px":"20px"}}>Submit</button>
										</div>:
										<>
										{ViewCarts && ViewCarts.map((data)=>
                                             <button className="theme-btn-1 btn btn-block" onClick={openPayModal}>
                                                  Pay ₹{data.total || 0} now
                                           </button>
                                        )}
										</>
										}
									
									</form>
								</div>
							</div>

						</div>
					</div>
        </>

	)

}

const mapStateToProps = (state) =>
({
	ServiceCart:state.AllReducer.Service_Cart || [],
});
export default connect(mapStateToProps)(Form);