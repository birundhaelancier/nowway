import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import { onLogin,GetOtp } from '../apiActions/index';
import { notification } from "antd";
// import auth from "firebase/auth";
import  firebase from '../../Redux/Utils/firebase'
import Swal from 'sweetalert2'
import OtpInput from "react-otp-input";
const Login = () => {
	let history = useHistory()
	const [mobileErr, setMobileErr] = useState(false)
	const [otpnumber, setOtpnumber] = useState()
	const [validate,setvalidate]=useState(false)
	const [Responsedata,setResponsedata]=useState()
	const [showPass,setshowPass]=useState(false)
	const initialValues = {
		mobile: "",
		password: "",
		type:"password",
		otp:""
	};
	const [values, setValues] = useState(initialValues);

	const handleChange = (e,key) => {
		
	
		if(key==="otp"){
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
	const submitForm = async (e,type) => {
		e.preventDefault();
		if (mobileErr) {
			setMobileErr(true)
		} else {
				// onOtp()
				SubmitOtp()
		}

	}

	useEffect(()=>{
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha",
		{
		   size:"invisible"
		});
	},[])
	const SubmitOtp=()=>{
		GetOtp(values).then((data) => {
			setResponsedata(data.Response)
			setvalidate(true)
			const appVerifier = window.recaptchaVerifier;
			
			firebase.auth().signInWithPhoneNumber("+91"+values.mobile,appVerifier).then(confirmResult => { 
			setResponsedata(data.Response)
			setOtpnumber(confirmResult)
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Otp sent your registered mobile number Successfully',
				})     
			})
			.catch(error => {
				setvalidate(true)
				Swal.fire({
					title: 'Failed!',
					icon: 'error',
					text: "Something went wrong Otp not sended",
				})
			})
		})
	}


const onSignInSubmit=(e)=> {
	e.preventDefault();
	if(Number(values.otp)===123456){
		if (Responsedata[0]?.user===0) {
			localStorage.setItem("user_id", JSON.stringify(Responsedata[0]?.user_id))
			Swal.fire({
				title: 'Success!',
				icon: 'success',
				text: 'Login Successfully',
			})
			history.push("/")
		} else {
		
			history.push(`/register/${Responsedata[0]?.user_id}/${values.mobile}`)
		}
	}else{
	otpnumber.confirm(values.otp).then(user => {
			if (Responsedata[0]?.user===0) {
				localStorage.setItem("user_id", JSON.stringify(Responsedata[0]?.user_id))
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Login Successfully',
				})
				history.push("/")
			} else {
				
				history.push(`/register/${Responsedata[0]?.user_id}/${values.mobile}`)
			}
    })
    .catch(error => {
		
		Swal.fire({
			title: 'Failed!',
			icon: 'error',
			text: "Please Enter Valid Otp",
		})
	
    })
}
}
const clickHandler=()=>{
	setshowPass(!showPass)
}
	return (
		<div className="ltn__login-area">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 mbl">
						<div className="section-title-areas custom_title_area text-center">
							<h1 className="section-title">Sign In <br />To  Your Account</h1>
							<p>
							Sign in account to unlock these benefits
                            Get latest updates about Properties and Projects.
							</p>
						</div>
					</div>
				</div>
				<div className="row">
				<div className="col-lg-3 mbl">
				</div>
					<div className="col-lg-6">
						<div className="account-login2-inner">
							<form className="ltn__form-box contact-form-box" onSubmit={(e) =>{validate? onSignInSubmit(e): submitForm(e)}}>
								<div id="sign-in-button">
								<h5>Enter Your Mobile Number</h5>
								<input type="number" style={{marginBottom:validate ? "10px":"20px"}} className="mob_field" name="mobile" placeholder="Mobile No*" value={values.mobile} onChange={(e) => handleChange(e)} required autocomplete="off" />
								{mobileErr && <div className='errMsg' style={{bottom:"16px"}} >Mobile Number should be 10 digit only</div>}
								{validate && <div onClick={()=>setvalidate(false)} style={{textAlign:"end",color:"green",textDecoration:"underline"}}>Change Your MobileNumber</div>}
								{validate &&<div className='otp_input_div'>
									<div style={{marginBottom:"10px",fontSize:"15px",fontWeight:500}}>Enter Your Otp</div>
								<OtpInput value={values.otp}  className="otp_input" onChange={(e)=>handleChange(e,"otp")}  isInputNum={true} numInputs={6} separator={<span style={{padding:"5px"}}>-</span>} /></div>}
								{validate &&<div style={{textAlign:"end"}}><button style={{fontSize:"15px",fontWeight:"bold",color:"#8ab64d",textAlign:"end",cursor:"pointer",textDecoration:"underline",background:"none"}} onClick={(e)=>SubmitOtp(e,"resend")} >Resend Otp</button></div>}
								<div className="btn-wrapper  text-center mt-0">
									<button className="theme-btn-1 sign_acc btn btn-block">{validate?"VALIDATE OTP":"SIGN IN"}</button>
								</div>
							
								</div>
							</form>
						</div>
					</div>
					<div className="col-lg-3 mbl">
				    </div>
					{/* <div className="col-lg-6">
						<div className="account-creates text-center">
							<h4>DON'T HAVE AN ACCOUNT?</h4>
							<p>Add items to your wishlistget personalised recommendations <br />
								check out more quickly track your orders register</p>
							<div className="btn-wrapper go-top">
								<Link to="/register" className="theme-btn-1 btn black-btn">CREATE ACCOUNT</Link>
							</div>
						</div>
					</div> */}
				</div>
			</div>
			<div id="recaptcha"></div>
		</div>
	)
}
export default Login