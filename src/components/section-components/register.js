import React, { useEffect, useState } from 'react';
import { Link, useHistory,useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import { notification } from "antd";
import { onRegister, GetOtp } from '../apiActions/index';
import Toast from '../toast/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Model';
import  firebase from '../../Redux/Utils/firebase'
import Swal from 'sweetalert2'
function RegisterComp(props) {
	let history = useHistory()
	let { userid,mobilenumber } =useParams()
	const initialValues = {
		email: "",
		password: "",
		name: "",
		mobile: mobilenumber || "",
		otp: "",
	};
	const [values, setValues] = useState(initialValues);
	const [showOtp, setShowOtp] = useState(false)
	const [otpnumber, setOtpnumber] = useState()
	const [mobileErr, setMobileErr] = useState(false)
	const [emailErr, setEmailErr] = useState(false)
	const [showPass,setshowPass]=useState(false)
	const [ResponseData,setResponseData]=useState(false)
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "mobile") {
			if (value.length !== 10) {
				setMobileErr(true)
			} else {
				setMobileErr(false)
			}
		}

		if (name === "email") {
			var pattern = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

			if (!pattern.test(value)) {
				setEmailErr(true)
			} else {
				setEmailErr(false)
			}
		}
		setValues({
			...values,
			[name]: value,
		});
	}

	useEffect(()=>{
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha",
		{
		   size:"invisible"
		});
	},[])

	const submitForm = (e, key) => {
		e.preventDefault();
		if (!mobileErr && !emailErr) {
			onRegister(values,userid).then((data) => {
				console.log("chekkk",data)
				if (data.Status === "Success") {
					localStorage.setItem("wallet", JSON.stringify(data.Response[0].wallet))
					localStorage.setItem("user_id", JSON.stringify(data.Response[0]?.id))
						Swal.fire({
							showClass: {
							  popup: 'animate__animated animate__fadeInDown'
							},
							hideClass: {
							  popup: 'animate__animated animate__fadeOutUp'
							},
							title:`N/W cash ${data.Response[0]?.wallet} Credited`,
						    icon: 'success',
							text:'Registration Successfully!' ,
						    // html: <p style={{color:"#ec4249",fontWeight:"700",fontSize:"20px"}}></p>,
						  })
					history.push("/")
					
					// setShowOtp(true)
				    // SubmitOtp()
				} 
				else {
					Swal.fire({
						title: 'Failed!',
						icon: 'error',
						text: data.Message,
					})
				}
			})
		}

	}
const SubmitOtp=()=>{
	GetOtp(values).then((data) => {				
		const appVerifier = window.recaptchaVerifier;
		firebase.auth().signInWithPhoneNumber("+91"+values.mobile,appVerifier).then(confirmResult => { 
		setOtpnumber(confirmResult)
		setResponseData(data.Response)
			Swal.fire({
				title: 'Success!',
				icon: 'success',
				text: 'Otp sent your registered mobile number Successfully',
			})
		})
	
	})
}
	const onOtp = (e) => {
		// if (values.otp == otpnumber || values.otp == "1234") {
			// notification.success({
			// 	message: "OTP Register Successfully"
			// })
		// 	history.push("/login")
		// } else {
		// 	notification.error({
		// 		message: "Invalid OTP"
		// 	})
		// 	setShowOtp(false)
		// }
			e.preventDefault();
		otpnumber.confirm(values.otp).then(user => {
			history.push("/login")
			Swal.fire({
				title: 'Success!',
				icon: 'success',
				text: 'OTP Verified Successfully',
			})
		})
		.catch(error => {
			Swal.fire({
				title: 'Failed!',
				icon: 'error',
				text: "Please Enter Valid Otp",
			})
		})
	}
	const clickHandler=()=>{
		setshowPass(!showPass)
	}
	return (
		<div className="ltn__login-area">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 mbl">
						<div className="section-title-areas text-center">
							<h1 className="section-title">Register <br />Your Account</h1>
							<p>
							Create an account to unlock these benefits
                           Get latest updates about Properties and Projects.
							</p>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-6">
						<div className="account-login-inner">
							<form className="ltn__form-box contact-form-box" onSubmit={(e) => submitForm(e)}>
								<input type="text" name="name" placeholder="Name*" value={values.name} onChange={(e) => handleChange(e)} required={showOtp ? false : true} />
								<input type="text" name="email" placeholder="Email*" value={values.email}
									onChange={(e) => handleChange(e)} required={showOtp ? false : true} />
								{emailErr && <div className='errMsg'>Invalid Email</div>}
								<input type="number" name="mobile" placeholder="Mobile No*"  readOnly={userid?true:false} value={values.mobile} onChange={(e) => handleChange(e)} required={showOtp ? false : true} />
								{mobileErr && <div className='errMsg'>Mobile Number should be 10 digit only</div>}
								<div className='pass_show_div'>
								<input type={showPass?"text":"password"} name="password" placeholder="Password*" value={values.password} onChange={(e) => handleChange(e)} required={showOtp ? false : true} />
								   <i onClick={clickHandler} class={showPass ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
								</div>
								<div className="btn-wrapper   go-top">
									<button className="theme-btn-1 sign_acc btn black-btn">CREATE ACCOUNT</button>
								</div>
							</form>
						</div>
					</div>
					<Modal show={showOtp} modelTitle={"Enter Your OTP"} handleClose={() => setShowOtp(false)}>
						<div className="ltn__quick-view-modal-inner">
						{/* <div className="col-lg-12 text-center modalHeading">Enter Your OTP</div> */}
							<div className="container">
								<div className="row text-center">
									<form className="ltn__form-box" onSubmit={(e) => onOtp(e)}>
										<input type="number" name="otp" placeholder="OTP*" value={values.otp} style={{marginBottom:"10px"}} onChange={(e) => handleChange(e)} required />
										<div style={{margin:"8px",fontSize:"15px",fontWeight:"bold",color:"#8ab64d",textAlign:"end"}} onClick={(e) => SubmitOtp(e)}>Resend Otp</div>
										<div className="go-top">
											<button className="theme-btn-1 btn btn-block postBtn" id="recaptcha">SUBMIT OTP</button>
										</div>
									</form>
								</div>
							</div>
						</div>

					</Modal>
					<div className="col-lg-6">
						<div className="account-creates text-center">
							<h4>DON'T HAVE AN ACCOUNT?</h4>
							<p>Add items to your wishlistget personalised recommendations <br />
								check out more quickly track your orders register</p>
							<div className="btn-wrapper go-top">
								<Link to="/login" className="theme-btn-1 btn black-btn">SIGN IN</Link>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div id="recaptcha"></div>
		</div>
	)
}

export default RegisterComp;
{/* <DynModel  handleChangeModel={Modalopen} modelTitle={"View Claimes"}
                       modalchanges="recruit_modal_css" handleChangeCloseModel={() =>setModalopen(false)} width={600} content={ */}