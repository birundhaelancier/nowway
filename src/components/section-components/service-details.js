
import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import Modal from '../Model';
import { AddSubServiceEnquiry,GetTime_Slot,GetLocations } from '../apiActions/index';
import { notification,DatePicker } from "antd";
import SelectInput from '../Select';
import moment from 'moment'
import './service.scss'
import Checkout from './checkout'
import FormComp from './form'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {Helmet} from "react-helmet";
// import {Helmet} from "react-helmet";
const ServiceDetails = ({ sub_services, ser_image,service,ServiceCart,ser_id }) => {
	document.title ="Welcome | here is your page title to display"; 
document.getElementsByTagName("META")[2].content="Your description about the page or site here to set dynamically";
	let history = useHistory()
	let publicUrl = process.env.PUBLIC_URL + '/'
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [continuepay,setcontinue]=useState(false)
	const [location,setLocation]=useState([])
	const [mobileErr, setMobileErr] = useState(false)
	const [locatErr,setlocatErr]=useState(false)
	const [sub_serv, setSub_serv] = useState()
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
		AddSubServiceEnquiry(values, sub_serv?.id).then((data) => {
			if (data.Status == "Success") {
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: data.Message,
				})
				handleCancel()
				setIsModalVisible(false)
			} else {
				Swal.fire({
					title: 'Failed!',
					icon: 'error',
					text: data.Message,
				})
			}
		})
	 }
	 else{
		 setlocatErr("Please select location")
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

	const selectSubserivce = (data) => {

		if (JSON.parse(localStorage.getItem("user_id"))) {
			setIsModalVisible(true)
			setSub_serv(data)
		} else {
			history.push("/login")
		}

	}

	const closeModal = () => {
		setIsModalVisible(false)
		handleCancel()
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
	return (
		<div className="ltn__page-details-area ltn__service-details-area">
		
			<div className="container">
			<p  dangerouslySetInnerHTML={{__html:sub_services && sub_services[0]?.service_description2}}></p>
				<div className="row">
					<div className="col-lg-6">
						<div className="ltn__page-details-inner ltn__service-details-inner">
							<div className="ltn__blog-img">
								<img className='serviceImage' src={sub_services && sub_services[0]?.service_image} alt="Image" />
						
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<aside className="sidebar-area ltn__right-sidebar">
					
							<div className="widget-2 ltn__menu-widget ltn__menu-widget-2">

								<ul className="go-top">
									{sub_services?.map((data) => {
										return (
											<li>
												<button className='side-btn-show' onClick={() => selectSubserivce(data)}>
											     	<div>
														<img src={data.image} style={{width:"100px",height:"80px"}}/>
													    <div style={{paddingLeft:"20px",textAlign:"left"}}>{data.name}</div>
													</div>
													<div>
														<span><i className="fas fa-arrow-right" /></span>
													</div>
												</button>
											</li>
										)
									})}
								</ul>
							
								</div>
						</aside>
					  
					</div>
					<div className="col-lg-12">
					<div  dangerouslySetInnerHTML={{__html:sub_services && sub_services[0]?.service_description3}}></div>
					</div>
				</div>
			</div>
			<Modal show={isModalVisible} width={service==1?600:800}  modalchanges={"service_modal"} modelTitle={
				<div className='modal_title_div'>
		         	<span>{sub_serv?.name}</span> 
					 {service===1&&ServiceCart.length>0 && <span  style={{textAlign:"center",paddingLeft:"20px"}}>
                       <div className="cash_style">₹{ServiceCart && ServiceCart[0]?.nwcash}</div>
                       <img src={publicUrl + "assets/img/cash.png"} style={{width:"20px",height:"20px",marginTop:"-12px"}} />
				    </span>}
				</div>
				} handleClose={closeModal}>
			{service==0?
			<FormComp sub_serv={sub_serv} service={service} handleClose={closeModal}/>:
			<div className='cutom_ser_mo'>
             <Checkout sub_services={sub_services} sub_serv={sub_serv?.id}  handleClose={closeModal} ser_id={sub_serv?.id}/>
			 </div>}
			 

			</Modal>

		</div>
	)

}


const mapStateToProps = (state) =>
({
    ServiceCart:state.AllReducer.Service_Cart.Response || [],
});
export default connect(mapStateToProps)(ServiceDetails);