import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import { onLogin } from '../apiActions/index';
import { notification } from "antd";


const Login = () => {
	let history = useHistory()
	const [mobileErr, setMobileErr] = useState(false)
	const initialValues = {
		mobile: "",
		password: "",
	};
	const [values, setValues] = useState(initialValues);

	const handleChange = (e) => {
		
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
		if (mobileErr) {
			setMobileErr(true)
		} else {
			onLogin(values).then((data) => {
				if (data.Status == "Success") {
					localStorage.setItem("user_id", JSON.stringify(data.Response[0].id));
					notification.success({
						message: data.Message
					})
					history.push("/")
				} else {
					notification.success({
						message: data.Message
					})
				}
			})
		}

	}

	return (
		<div className="ltn__login-area">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 mbl">
						<div className="section-title-areas text-center">
							<h1 className="section-title">Sign In <br />To  Your Account</h1>
							<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
								Sit aliquid,  Non distinctio vel iste.</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<div className="account-login-inner">
							<form className="ltn__form-box contact-form-box" onSubmit={(e) => submitForm(e)}>
								<input type="number" name="mobile" placeholder="Mobile No*" value={values.mobile} onChange={(e) => handleChange(e)} required autocomplete="off" />
								{mobileErr && <div className='errMsg'>Mobile Number should be 10 digit only</div>}
								<input type="password" name="password" placeholder="Password*" value={values.password} onChange={(e) => handleChange(e)} required autocomplete="off" />
								<div className="btn-wrapper mt-0">
									<button className="theme-btn-1 btn btn-block">SIGN IN</button>
								</div>
								<div className="go-to-btn mt-20">
									<a href="/#"><small>FORGOTTEN YOUR PASSWORD?</small></a>
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
		</div>
	)
}
export default Login