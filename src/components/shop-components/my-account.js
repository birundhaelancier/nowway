import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { GetUserDetails, UpdateUserDetails } from '../apiActions/index';
import { notification } from 'antd';
import Modal from '../Model';
import { GetHomeList } from '../apiActions/index';


const MyAccount = () => {
	let publicUrl = process.env.PUBLIC_URL + '/';
	const initialValues = {
		fname: "",
		lname: "",
		name: "",
		email: "",
		description: "",
		curPassword: "",
		newPassword: "",
		conPassword: "",
		profession: "",
	};
	const [userDetails, setUserDetails] = useState(initialValues);
	const [show_PasswordInput, setShow_PasswordInput] = useState(false)
	const [picture, setPicture] = useState("https://thumbs.dreamstime.com/b/aster-flowers-art-design-26968847.jpg");
	const inputElement = useRef(null);
	const [home_list, setHome_list] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [userInfo, setUserInfo] = useState(false);

	const Images = [
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/16456040931180807696.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645604156917821097.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/16456040931180807696.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645604156917821097.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645604156917821097.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/16456040931180807696.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645604156917821097.jpg" },
	]


	useEffect(() => {
		GetHomeList().then((data) => {
			setHome_list(data.Response)
		})
		GetUserDetails().then((data) => {
			let response = data.Response[0];
			console.log(response, "response")
			userDetails.fname = response.name;
			userDetails.lname = response.last_name;
			userDetails.name = response.display_name;
			userDetails.email = response.email;
			userDetails.description = response.description;
			userDetails.curPassword = response.password;

			setUserDetails({
				...userDetails,
			});

			// Object.keys(initialValues).map((data) => {
			// 	return Object.keys(response).map((item) => {
			// 		console.log(item, "response.item")
			// 		if (data == item) {
			// 			setUserDetails({
			// 				...userDetails,
			// 				[data]: response.data,
			// 			});
			// 		}
			// 	})
			// })

		})
	}, [])
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "conPassword") {
			if (userDetails.newPassword == value) {
				setUserDetails({
					...userDetails,
					[name]: value,
				});
			} else {
				notification.error({
					message: "Not Match the Confirm Password"
				})
				userDetails.newPassword = "";
				setUserDetails({
					...userDetails,
				});
			}

		} else {
			setUserDetails({
				...userDetails,
				[name]: value,
			});
		}

	}

	const submitForm = async (e) => {
		e.preventDefault();
		UpdateUserDetails(userDetails, picture, show_PasswordInput).then((response) => {
			if (response.Status == "Success") {
				notification.success({
					message: response.Message
				})
			} else {
				notification.error({
					message: response.Message
				})
			}
		})
	}

	const onChangePicture = async (e) => {
		const file = e.target.files[0]
		const base64 = await convertBase64(file)
		setPicture(base64)
	}

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file)
			fileReader.onload = () => {
				resolve(fileReader.result);
			}
			fileReader.onerror = (error) => {
				reject(error);
			}
		})
	}
	const fileclick = () => {
		inputElement.current.click()
	}

	const selectSubserivce = (data) => {
		setIsModalVisible(true)
		setUserInfo(data)
	}

	console.log(userInfo, "home_list")

	return (
		<div className="liton__wishlist-area pb-70">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						{/* PRODUCT TAB AREA START */}
						<div className="ltn__product-tab-area">
							<div className="container">
								<div className="row">
									<div className="col-lg-4">
										<div className="ltn__tab-menu-list mb-50">
											<div className="nav">
												<a data-bs-toggle="tab" href="#liton_tab_1_1">Dashboard <i className="fas fa-home" /></a>
												<a data-bs-toggle="tab" className="active show" href="#liton_tab_1_2">Wishlist <i className="fas fa-heart" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_0">Contacted <i className="fas fa-phone" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_3">Downloads <i className="fas fa-arrow-down" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_4">address <i className="fas fa-map-marker-alt" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_5">Account Details <i className="fas fa-user" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_6">My Property <i className="fas fa-user" /></a>
												<Link className="go-top" to="/login">Logout <i className="fas fa-sign-out-alt" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="tab-content">
											<div className="tab-pane fade" id="liton_tab_1_1">
												<div className="ltn__myaccount-tab-content-inner">
													<p>Hello <strong>UserName</strong> (not <strong>UserName</strong>? <small><a href="login-register.html">Log out</a></small> )</p>
													<p>From your account dashboard you can view your <span>recent orders</span>, manage your <span>shipping and billing addresses</span>, and <span>edit your password and account details</span>.</p>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_2">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															<div className='grid-Shows'>
																<div className='up-cross'><i class="far fa-window-close"></i></div>
																<div className="product-img go-top">
																	<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																	<div className="product-badge re-content">
																		<button className='rm-btn'>Rent</button>
																	</div>
																</div>
																<div className='cont-amount'>
																	<div className='nw-amount'>₹15,000</div>
																	<div>Kamarajar Street, Madurai</div>
																</div>
																<div></div>
																{/* <div className='cont-address'>
																	<div className='icon'> <i class="fas fa-user"></i> MuthuKumar</div>
																	<div className='icon'> <i class="fas fa-phone"></i>7890787878</div>
																	<div className='cont-mail'>nowway@gmail.com</div>
																</div> */}
																<div className='low-cross'><i class="far fa-window-close"></i></div>

															</div>
															<div className='grid-Shows'>
																<div className='up-cross'><i class="far fa-window-close"></i></div>
																<div className="product-img go-top">
																	<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																	<div className="product-badge re-content">
																		<button className='rm-btn'>Rent</button>
																	</div>
																</div>
																<div className='cont-amount'>
																	<div className='nw-amount'>₹17,000</div>
																	<div>Kamarajar Street, Madurai</div>
																</div>
																<div></div>
																{/* <div className='cont-address'>
																	<div className='icon'> <i class="fas fa-user"></i> Krishna</div>
																	<div className='icon'> <i class="fas fa-phone"></i>9865432878</div>
																	<div className='cont-mail'>nowway@gmail.com</div>
																</div> */}
																<div className='low-cross'><i class="far fa-window-close"></i></div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_0">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															<div className='grid-Show'>
																<div className="product-img go-top">
																	<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																	<div className="product-badge re-content">
																		<button className='rm-btn'>Rent</button>
																	</div>
																</div>
																<div className='cont-amount'>
																	<div className='nw-amount'>₹15,000</div>
																	<div>Kamarajar Street, Madurai</div>
																</div>
																<div className='cont-address'>
																	<div className='icon'> <i class="fas fa-user"></i> MuthuKumar</div>
																	<div className='icon'> <i class="fas fa-phone"></i>7890787878</div>
																	<div className='cont-mail'>nowway@gmail.com</div>
																</div>

															</div>
															<div className='grid-Show'>
																<div className="product-img go-top">
																	<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																	<div className="product-badge re-content">
																		<button className='rm-btn'>Rent</button>
																	</div>
																</div>
																<div className='cont-amount'>
																	<div className='nw-amount'>₹17,000</div>
																	<div>Kamarajar Street, Madurai</div>
																</div>
																<div className='cont-address'>
																	<div className='icon'> <i class="fas fa-user"></i> Krishna</div>
																	<div className='icon'> <i class="fas fa-phone"></i>9865432878</div>
																	<div className='cont-mail'>nowway@gmail.com</div>
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_3">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<table className="table">
															<thead>
																<tr>
																	<th>Product</th>
																	<th>Date</th>
																	<th>Expire</th>
																	<th>Download</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>Carsafe - Car Service PSD Template</td>
																	<td>Nov 22, 2020</td>
																	<td>Yes</td>
																	<td><a href="#"><i className="far fa-arrow-to-bottom mr-1" /> Download File</a></td>
																</tr>
																<tr>
																	<td>Carsafe - Car Service HTML Template</td>
																	<td>Nov 10, 2020</td>
																	<td>Yes</td>
																	<td><a href="#"><i className="far fa-arrow-to-bottom mr-1" /> Download File</a></td>
																</tr>
																<tr>
																	<td>Carsafe - Car Service WordPress Theme</td>
																	<td>Nov 12, 2020</td>
																	<td>Yes</td>
																	<td><a href="#"><i className="far fa-arrow-to-bottom mr-1" /> Download File</a></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_4">
												<div className="ltn__myaccount-tab-content-inner">
													<p>The following addresses will be used on the checkout page by default.</p>
													<div className="row">
														<div className="col-md-6 col-12 learts-mb-30">
															<h4>Billing Address <small><a href="#">edit</a></small></h4>
															<address>
																<p><strong>Alex Tuntuni</strong></p>
																<p>1355 Market St, Suite 900 <br />
																	San Francisco, CA 94103</p>
																<p>Mobile: (123) 456-7890</p>
															</address>
														</div>
														<div className="col-md-6 col-12 learts-mb-30">
															<h4>Shipping Address <small><a href="#">edit</a></small></h4>
															<address>
																<p><strong>Alex Tuntuni</strong></p>
																<p>1355 Market St, Suite 900 <br />
																	San Francisco, CA 94103</p>
																<p>Mobile: (123) 456-7890</p>
															</address>
														</div>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_5">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="ltn__form-box">
														<form onSubmit={(e) => submitForm(e)}>
															<div className="row mb-50">
																<div className="col-md-12 profile_show">
																	<div className="filecontainer" onClick={fileclick}>
																		<div className="uploads">
																			<input id="profilePic" type="file" onChange={(e) => onChangePicture(e)} className="fileinput hidden" ref={inputElement} />
																			<img src={picture} alt=" " className="uploadimage" />
																		</div>
																	</div>
																</div>
																<div className="col-md-6">
																	<label>First name:</label>
																	<input type="text" name="fname" onChange={(e) => handleChange(e)}
																		value={userDetails.fname} />
																</div>
																<div className="col-md-6">
																	<label>Last name:</label>
																	<input type="text" name="lname" onChange={(e) => handleChange(e)}
																		value={userDetails.lname} />
																</div>
																<div className="col-md-6">
																	<label>Display Name:</label>
																	<input type="text" name="name" onChange={(e) => handleChange(e)} placeholder="display name"
																		value={userDetails.name} />
																</div>
																<div className="col-md-6">
																	<label>Display Email:</label>
																	<input type="email" name="email" onChange={(e) => handleChange(e)}
																		value={userDetails.email} />
																</div>
																<div className="col-md-12">
																	<label>Bio:</label>
																	<textarea type="text" name="description" onChange={(e) => handleChange(e)}
																		value={userDetails.description} />
																</div>
																<div className="col-md-12">
																	<label> Profession:</label>
																	<input required type="text" name="profession" onChange={(e) => handleChange(e)} placeholder="Profession"
																		value={userDetails.profession} />
																</div>
																<div className="col-md-12">
																	<label>Current password:</label>
																	<input type="password" name="curPassword" onChange={(e) => handleChange(e)}
																		value={userDetails.curPassword} />
																	<div className='change_pwd_link' onClick={() => setShow_PasswordInput(!show_PasswordInput)}>Change Password</div>
																</div>
																{show_PasswordInput &&
																	<>
																		<div className="col-md-12">
																			<label>New password:</label>
																			<input type="password" name="newPassword" onChange={(e) => handleChange(e)}
																				value={userDetails.newPassword} />
																		</div>
																		<div className="col-md-12">
																			<label>Confirm new password:</label>
																			<input type="password" name="conPassword" onChange={(e) => handleChange(e)}
																				value={userDetails.conPassword} />
																		</div>
																	</>}
																<div className="btn-wrapper">
																	<button type="submit" className="theme-btn-1 btn btn-block text-uppercase mb-15">Save Changes</button>
																</div>
															</div>

														</form>
													</div>
												</div>
											</div>
											<div className="tab-pane fade active show" id="liton_tab_1_6">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															{home_list.map((data, index) => {
																return (
																	<div className='gridproperty-Shows'>
																		<div className='up-cross'><i class="far fa-window-close"></i></div>
																		<div className="product-img go-top">
																			<Link to="/product-details"><img src={Images[index]?.img} alt="#" /></Link>
																			<div className="product-badge re-content">
																				<button className={data.type === "Rent" ? "sale-badge bg-green" : "sale-badge-sell"}>{data.type === "Rent" ? "Rent" : "Sell"}</button>
																			</div>
																		</div>
																		<div className='cont-amount'>
																			<div className='list_username'>{data.user_name}</div>
																			<div className='lisu_number'>{data.user_mobile}</div>
																			<div className='lisu_number'>{data.property_type}</div>
																			<div className='lisu_number'>₹{data.price}</div>
																			<div className='lisu_number'>{data.address}</div>
																		</div>
																		<div className='list_more'>
																			<button className='more_btn' onClick={() => selectSubserivce(data)}>More Details</button>
																		</div>
																	</div>
																)
															})}
														</div>
													</div>
												</div>
												<Modal show={isModalVisible} handleClose={() => setIsModalVisible(false)}>
													<div className="ltn__quick-view-modal-inner">
														<div className="col-lg-12 text-center modalHeading">User Details</div>
														<div className="container">
															<div className="row">
																<div className="property-detail-info-list section-bg-1 clearfix mb-60">
																	<ul>
																		<li><label>Property ID:</label> <span>{userInfo.code}</span></li>
																		<li><label>Floors: </label> <span>{userInfo.floors}</span></li>
																		<li><label>Rooms:</label> <span>{userInfo.rooms}</span></li>
																		<li><label>Baths:</label> <span>2</span></li>
																		<li><label>Year built:</label> <span>{userInfo.year_built}</span></li>
																	</ul>
																	<ul>
																		<li><label>Lot Area:</label> <span>HZ29 </span></li>
																		<li><label>Lot dimensions:</label> <span>120 sqft</span></li>
																		<li><label>Beds:</label> <span>{userInfo.bedrooms}</span></li>
																		<li><label>Price:</label> <span>{userInfo.price}</span></li>
																		<li><label>Garage Size:</label> <span>{userInfo.garage_size}</span></li>
																	</ul>
																</div>

															</div>
														</div>
													</div>

												</Modal>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAccount;