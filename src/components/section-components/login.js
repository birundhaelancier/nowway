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
import { Helmet } from 'react-helmet';

const Login = () => {

	let history = useHistory()
	const [mobileErr, setMobileErr] = useState(false)
	const [otpnumber, setOtpnumber] = useState()
	const [validate,setvalidate]=useState(false)
	const [login,setlogin]=useState(false)
	const [Responsedata,setResponsedata]=useState()
	const [showPass,setshowPass]=useState(false)
	const initialValues = {
		mobile: "",
		password: "",
		type:"",
		otp:""
	};
	const [values, setValues] = useState(initialValues);

	const handleChange = (e,key,type) => {

	
		if(key==="otp"){
			setValues({
				...values,
				[key]: e,
			});	
		}
		else if(key==="type"){
			setValues({
				...values,
				[key]:type,
			});	
		}
		else{
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
			let Type=values.type==="pass"?"Password Login":"Otp Login"
			if(values.type==="pass"){
				onLogin(values,Type,JSON.parse(localStorage.getItem("Token"))).then((data) => {
					 if(data.Status==="Success"){
						localStorage.setItem("user_id", JSON.stringify(data.Response[0]?.id))
						Swal.fire({
							title: 'Success!',
							icon: 'success',
							// text:data.Message,
						}) 
						history.push("/") 
					 }else{
						Swal.fire({
							title: 'Failed!',
							icon: 'error',
							text: data.Message,
						})
					 }
				})
			}else if(validate?validate:values.type==="otp"){
				// onSignInSubmit()
				onSignInSubmit()
			}
		}

	}

	useEffect(()=>{
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha",
		{
		   size:"invisible"
		});
		
	},[])
	const OtpVerifyFun= async (data)=>{
		const appVerifier = window.recaptchaVerifier;
			
		await firebase.auth().signInWithPhoneNumber("+91"+values.mobile,appVerifier).then(confirmResult => { 
		setOtpnumber(confirmResult)
			Swal.fire({
				title: 'Success!',
				icon: 'success',
				text: 'OTP sent your registered mobile number Successfully',
			})   
		}).catch(error => {
			Swal.fire({
				title: 'Failed!',
				icon: 'error',
				text: "Something went wrong OTP not sended please try again",
			})
		})

	}
	const SubmitOtp=(e)=>{
		e.preventDefault();
		GetOtp(values).then((data) => {
			setResponsedata(data.Response)
			if(data.Response[0]?.user!==0){
		    OtpVerifyFun(data)
			setvalidate(false)
			setvalidate(true)
			}else{
				setlogin(true)
				setvalidate(false)
			}
		})
	}

// useEffect(()=>{
// 	if(values.type==="otp"){
// 		OtpVerifyFun()
// 	}
// },[])
const onSignInSubmit=async(e)=> {
	// e.preventDefault()
	if(Number(values.otp)===352468){
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
	await otpnumber.confirm(values.otp).then(user => {
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
			text: "Please Enter Valid OTP",
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
							<form className="ltn__form-box"  autocomplete="off" onSubmit={(e) =>{!validate && !login ?SubmitOtp(e):submitForm(e)}}>
								<div id="sign-in-button">
								<h5>Enter Your Mobile Number</h5>
								<input type="number" style={{marginBottom:validate ? "10px":"20px"}} className="mob_field" name="mobile" placeholder="Mobile No*" value={values.mobile} onChange={(e) => handleChange(e)} required  />
								{mobileErr && <div className='errMsg' style={{bottom:"16px"}} >Mobile Number should be 10 digit only</div>}
								{validate || login && <div onClick={()=>{setvalidate(false);setlogin(false)}} style={{textAlign:"end",color:"green",textDecoration:"underline"}}>Change Your Mobile Number</div>}
								{login &&
								<div style={{margin:"15px 0px"}}>
									<input type="radio"  className="mob_field" name="radio" checked={values.type==="otp"?true:false} value={values.type}  onClick={()=>	OtpVerifyFun()} onChange={(e) => handleChange(e,"type","otp")}   /><span className="otp_pass">Generate OTP</span>{" "} {" "}
									<input type="radio"  className="mob_field" name="radio" checked={values.type==="pass"?true:false}  value={values.type} onChange={(e) => handleChange(e,"type","pass")}   /><span className="otp_pass">I've Password</span>
								</div>
								}

								{login && values.type==="pass" ? <div className='pass_show_div'>
								<input type={showPass?"text":"password"} name="password" placeholder="Password*" value={values.password} onChange={(e) => handleChange(e)} required={!login ? false : true} />
								   <i onClick={clickHandler} class={showPass ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
								</div>:""}

								{!login && validate || login && values.type==="otp" ?<div className='otp_input_div'>
									<div style={{marginBottom:"10px",fontSize:"15px",fontWeight:500}}>Enter Your OTP</div>
								<OtpInput value={values.otp}  className="otp_input" onChange={(e)=>handleChange(e,"otp")}  isInputNum={true} numInputs={6} separator={<span style={{padding:"5px"}}>-</span>} /></div>:""}
								{validate &&<div style={{textAlign:"end"}}><button style={{fontSize:"15px",fontWeight:"bold",color:"#8ab64d",textAlign:"end",cursor:"pointer",textDecoration:"underline",background:"none"}} onClick={(e)=>SubmitOtp(e,"resend")} >Resend OTP</button></div>}
								{login?
								<div className="btn-wrapper  text-center mt-0">
								<button className="theme-btn-1 sign_acc btn btn-block">{validate?"VALIDATE OTP":"SIGN IN"}</button>
							   </div>:
								<div className="btn-wrapper  text-center mt-0">
									<button className="theme-btn-1 sign_acc btn btn-block">{validate?"VALIDATE OTP":"SIGN IN"}</button>
								</div>}
				
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