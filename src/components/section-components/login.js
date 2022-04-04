import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import { onLogin,GetOtp } from '../apiActions/index';
import { notification } from "antd";
// import auth from "firebase/auth";
import  firebase from '../../Redux/Utils/firebase'

const Login = () => {
	let history = useHistory()
	const [mobileErr, setMobileErr] = useState(false)
	const [otpnumber, setOtpnumber] = useState()
	const initialValues = {
		mobile: "",
		password: "",
		type:"password",
		otp:""
	};
	const [values, setValues] = useState(initialValues);

	const handleChange = (e,key) => {
		
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
	const submitForm = async (e) => {
		e.preventDefault();
		let Type=values.type==="otp"?"Otp Login":"Password Login"
		if (mobileErr) {
			setMobileErr(true)
		} else {
			if(values.type==="password"){
			onLogin(values,Type).then((data) => {
				if (data.Status === "Success") {
					localStorage.setItem("user_id", JSON.stringify(data.Response[0].id));
					notification.success({
						message: "Login Successfully"
					})
					history.push("/")
				} else {
					notification.error({
						message: data.Message
					})
				}
			})
	    	}
			else{
				// onOtp()
				onSignInSubmit()
			}
		}

	}
const onOtp = () => {
		if (values.otp == otpnumber || values.otp == "1234") {
			notification.success({
				message: "Login Successfully"
			})
			history.push("/")
		} else {
			notification.error({
				message: "Invalid OTP"
			})
			// setShowOtp(false)
		}
	}
	useEffect(()=>{
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha",
		{
		   size:"invisible"
		});
	},[])
useEffect(()=>{
if(values.mobile && values.type=="otp" && !mobileErr &&values.otp==""){
	
	GetOtp(values,"Login").then((data) => {
		console.log("check",data)
		const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber("+91"+values.mobile,appVerifier).then(confirmResult => { 
		setOtpnumber(confirmResult)
			notification.success({
				message: "Otp sent your registered mobile number Successfully"
			})      
		})
		.catch(error => {
	
		})
	})


}
},[values])



const onSignInSubmit=()=> {
	let Type=values.type==="otp"?"Otp Login":"Password Login"
	otpnumber.confirm(values.otp).then(user => {
		// history.push("/")
		// notification.success({
		// 	message: "Login Successfully"
		// })
		onLogin(values,Type).then((data) => {
			if (data.Status === "Success") {
				localStorage.setItem("user_id", JSON.stringify(data.Response[0].id));
				notification.success({
					message: "Login Successfully"
				})
				history.push("/")
			} else {
				notification.error({
					message: data.Message
				})
			}
		})
    })
    .catch(error => {
		notification.error({
			message: "Please Enter Valid Otp"
		})
    })
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
					<div className="col-lg-6">
						<div className="account-login-inner">
							<form className="ltn__form-box contact-form-box" onSubmit={(e) => submitForm(e)}>
								<div id="sign-in-button">
								<h4>Enter OTP or Password</h4>
								<input type="number" name="mobile" placeholder="Mobile No*" value={values.mobile} onChange={(e) => handleChange(e)} required autocomplete="off" />
								{mobileErr && <div className='errMsg'>Mobile Number should be 10 digit only</div>}
								<input required type="radio" value={"otp"} checked={values.type==="otp"?true:false} name='type'  onChange={(e) => handleChange(e,"type")}/><span className="diff_sec">Generate OTP</span>
								<input required type="radio" value={"password"}  checked={values.type==="password"?true:false} name='type' onChange={(e) => handleChange(e,"type")}/><span className="diff_sec">I've Password</span>
								{values.type==="password"?<input type="password" name="password" placeholder="Password*" value={values.password} onChange={(e) => handleChange(e)} required autocomplete="off" />:
								<input type="password" name="otp" placeholder="Enter OTP*" value={values.otp} onChange={(e) => handleChange(e)} required autocomplete="off" />}
								{values.type==="otp"&&<div style={{textAlign:"end"}}><button style={{margin:"8px",fontSize:"15px",fontWeight:"bold",color:"#8ab64d",textAlign:"end",cursor:"pointer",textDecoration:"underline",background:"none"}}  type="submit" >Resend Otp</button></div>}
								<div className="btn-wrapper  mt-0">
									<button className="theme-btn-1 sign_acc btn btn-block">SIGN IN</button>
								</div>
								<div className="go-to-btn mt-20">
									<a href="/#"><small>FORGOTTEN YOUR PASSWORD?</small></a>
								</div>
								</div>
							</form>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="account-creates text-center">
							<h4>DON'T HAVE AN ACCOUNT?</h4>
							<p>Add items to your wishlistget personalised recommendations <br />
								check out more quickly track your orders register</p>
							<div className="btn-wrapper go-top">
								<Link to="/register" className="theme-btn-1 btn black-btn">CREATE ACCOUNT</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="recaptcha"></div>
		</div>
	)
}
export default Login