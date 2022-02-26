import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { GetUserDetails, UpdateUserDetails, GetContachDetails, GetMyList, GetWishlist } from '../apiActions/index';
import { notification } from 'antd';
import Modal from '../Model';
import Error from "../section-components/error";


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
	const [contact_list, setContact_list] = useState([])
	const [wish_list, setWish_list] = useState([])
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
		GetMyList().then((data) => {
			setHome_list(data.Response)
		})
		GetContachDetails().then((response) => {
			setContact_list(response.Response)
		})
		GetWishlist().then((response) => {
			setWish_list(response.Response)
		})
		GetUserDetails().then((data) => {
			let response = data.Response[0];
			userDetails.fname = response.name;
			userDetails.lname = response.last_name;
			userDetails.name = response.display_name;
			userDetails.email = response.email;
			userDetails.description = response.description;
			userDetails.curPassword = response.password;
			setPicture(response.image)
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

		setUserDetails({
			...userDetails,
			[name]: value,
		});
	}

	const submitForm = async (e) => {
		e.preventDefault();
		// if (show_PasswordInput && (userDetails.newPassword != " " && userDetails != " "))
		if (show_PasswordInput) {
			if (userDetails.newPassword == userDetails.conPassword) {
				UpdateUserDetails(userDetails, picture, show_PasswordInput).then((response) => {
					if (response.Status == "Success") {
						notification.success({
							message: response.Message
						})
						setShow_PasswordInput(false)
					} else {
						notification.error({
							message: response.Message
						})
					}
				})

			} else {
				notification.error({
					message: "Not Match the Confirm Password"
				})
			}
		} else {
			UpdateUserDetails(userDetails, picture, show_PasswordInput).then((response) => {
				if (response.Status == "Success") {
					notification.success({
						message: response.Message
					})
					setShow_PasswordInput(false)
				} else {
					notification.error({
						message: response.Message
					})
				}
			})
		}
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

	console.log(home_list, "home_list")

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
												<a data-bs-toggle="tab" className="active show" href="#liton_tab_1_1">Dashboard <i className="fas fa-home" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_2">Wishlist <i className="fas fa-heart" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_0">Contacted <i className="fas fa-phone" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_3">Downloads <i className="fas fa-arrow-down" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_4">My Property <i className="fas fa-list" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_5">Account Details <i className="fas fa-user" /></a>
												<Link className="go-top" to="/login">Logout <i className="fas fa-sign-out-alt" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="tab-content">
											<div className="tab-pane fade active show" id="liton_tab_1_1">
												<div className="ltn__myaccount-tab-content-inner">
													<p>Hello <strong>UserName</strong> (not <strong>UserName</strong>? <small><a href="login-register.html">Log out</a></small> )</p>
													<p>From your account dashboard you can view your <span>recent orders</span>, manage your <span>shipping and billing addresses</span>, and <span>edit your password and account details</span>.</p>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_2">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															{wish_list.length > 0 ?
																<>
																	{
																		wish_list.map((list, index) => {
																			return (
																				<div className='grid-Shows'>
																					<div className='up-cross'><i class="far fa-window-close"></i></div>
																					<div className="product-img go-top">
																						<Link to="/product-details"><img src={Images[index]?.img} alt="#" /></Link>
																						<div className="product-badge re-content">
																							<button className={list.type === "Rent" ? "sale-badge bg-green" : "sale-badge-sell"}>{list.type === "Rent" ? "Rent" : "Sell"}</button>
																						</div>
																					</div>
																					<div className='cont-amount'>
																						<div className='list_username'>{list.user_name}</div>
																						<div className='lisu_number'>{list.user_mobile}</div>
																						<div className='lisu_number'>₹{list.price}</div>
																						<div className='lisu_number'>{list.city + ", " + list.state + " - " + list.zip}</div>
																					</div>
																					<div></div>
																					<div className='low-cross'><i class="far fa-window-close"></i></div>

																				</div>
																			)
																		})
																	}
																</>
																:
																<Error />
															}

														</div>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_0">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															{contact_list.length > 0 ?
																<>
																	{contact_list.map((data, index) => {
																		return (
																			<div className='grid-Show'>
																				<div className="product-img go-top">
																					<Link to="/product-details"><img src={Images[index]?.img} alt="#" /></Link>
																					<div className="product-badge re-content">
																						<button className={data.type === "Rent" ? "sale-badge bg-green" : "sale-badge-sell"}>{data.type === "Rent" ? "Rent" : "Sell"}</button>
																					</div>
																				</div>
																				<div className='cont-amount'>
																					<div className='nw-amount'>₹{data.price}</div>
																					<div>Kamarajar Street, Madurai</div>
																				</div>
																				<div className='cont-address'>
																					<div className='icon'> <i class="fas fa-user"></i> {data.user_name}</div>
																					<div className='icon'> <i class="fas fa-phone"></i>{data.user_mobile}</div>
																					<div className='cont-mail'>{data.user_email}</div>
																				</div>

																			</div>
																		)
																	})}
																</>
																:
																<Error />
															}
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
													<div className="table-responsive">
														<div className='contact-container'>
															{home_list.length > 0 ?
																<>
																	{home_list.map((data, index) => {
																		return (
																			<div className='grid-Show'>
																				<div className="product-img go-top">
																					<Link to="/product-details"><img src={Images[index]?.img} alt="#" /></Link>
																					<div className="product-badge re-content">
																						<button className={data.type === "Rent" ? "sale-badge bg-green" : "sale-badge-sell"}>{data.type === "Rent" ? "Rent" : "Sell"}</button>
																					</div>
																				</div>
																				<div className='cont-amount'>
																					<div className='list_username'>{data.code}</div>
																					<div className='lisu_number'>{data.user_mobile}</div>
																					<div className='lisu_number'>{data.property_type}</div>
																					<div className='lisu_number'>₹{data.price}</div>
																					<div className='lisu_number'>{data.city + ", " + data.state + " - " + data.zip}</div>
																				</div>
																				<div className='list_more'>
																					<button className='more_btn' onClick={() => selectSubserivce(data)}>More Details</button>
																				</div>
																			</div>
																		)
																	})}
																</>
																:
																<Error />
															}
														</div>
													</div>
												</div>
												<Modal show={isModalVisible} handleClose={() => setIsModalVisible(false)}>
													<div className="ltn__quick-view-modal-inner ">
														<div className="col-lg-12 text-center modalHeading">User Details</div>
														<div className='modal_content-view'>
															<div className="container">
																<div className="row">
																	<div className="col-md-12 showProfile">
																		<img src={picture} alt=" " className="showUpload" />
																		<div className='per_info'>
																			<div className='u_name'>{userInfo.title}</div>
																			<div>₹{userInfo.price}</div>
																			<div>{userInfo.address}</div>
																		</div>
																	</div>
																	<div className="col-md-12 mb-10">
																		<h6>Description :</h6>
																		<textarea type="text" name="description"
																			value={userInfo.description} />
																	</div>
																	<h6>Property Details :</h6>
																	<div className="property-detail-info-list section-bg-1 clearfix mb-10">
																		<ul>
																			<li><label>Property ID:</label> <span>{userInfo.code}</span></li>
																			<li><label>Property Type: </label> <span>{userInfo.property_type}</span></li>
																			<li><label>Structure Type:</label> <span>{userInfo.structure_type}</span></li>
																			<li><label>Baths:</label> <span>2</span></li>
																			<li><label>Availabilty: </label> <span>{userInfo.availability}</span></li>
																			<li><label>Floors: </label> <span>{userInfo.floors}</span></li>
																			<li><label>Rooms:</label> <span>{userInfo.rooms}</span></li>

																		</ul>
																		<ul>
																			<li><label>Year built:</label> <span>{userInfo.year_built}</span></li>
																			<li><label>Available From:</label> <span>{userInfo.available_from}</span></li>
																			<li><label>Lot Area:</label> <span>HZ29 </span></li>
																			<li><label>Lot dimensions:</label> <span>120 sqft</span></li>
																			<li><label>Beds:</label> <span>{userInfo.bedrooms}</span></li>
																			<li><label>Price:</label> <span>{userInfo.price}</span></li>
																			<li><label>Garage Size:</label> <span>{userInfo.garage_size}</span></li>
																		</ul>
																	</div>
																	<div>
																		<ul className='extra_info'>
																			<li><label>Amenities  :</label> <span>{userInfo.amenities}</span></li>
																			<li><label>Furnishing  :</label> <span>{userInfo.furnishing}</span></li>
																			<li><label>Parking  :</label> <span>{userInfo.parking} </span></li>
																			<li><label>Roofing  :</label> <span>{userInfo.roofing} </span></li>
																			<li><label>Associate Fee  :</label> <span>{userInfo.owner_associ_fee} </span></li>
																			<li><label>Owner Note  :</label> <span>{userInfo.owner_note} </span></li>
																		</ul>
																	</div>

																</div>
															</div>
														</div>
													</div>

												</Modal>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_5">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="ltn__form-box">
														<form onSubmit={(e) => submitForm(e)}>
															<div className="row mb-50">
																<div className="col-md-12 profile_show">
																	<div className="filecontainer" onClick={fileclick}>
																		<div className="uploads">
																			<input required id="profilePic" type="file" onChange={(e) => onChangePicture(e)} className="fileinput hidden" ref={inputElement} />
																			<img src={picture} alt=" " className="uploadimage" />
																		</div>
																	</div>
																</div>
																<div className="col-md-6">
																	<label>First name:</label>
																	<input required type="text" name="fname" onChange={(e) => handleChange(e)}
																		value={userDetails.fname} />
																</div>
																<div className="col-md-6">
																	<label>Last name:</label>
																	<input required type="text" name="lname" onChange={(e) => handleChange(e)}
																		value={userDetails.lname} />
																</div>
																<div className="col-md-6">
																	<label>Display Name:</label>
																	<input required type="text" name="name" onChange={(e) => handleChange(e)} placeholder="display name"
																		value={userDetails.name} />
																</div>
																<div className="col-md-6">
																	<label>Display Email:</label>
																	<input required type="email" name="email" onChange={(e) => handleChange(e)}
																		value={userDetails.email} />
																</div>
																<div className="col-md-12">
																	<label>Bio:</label>
																	<textarea type="text" name="description" onChange={(e) => handleChange(e)}
																		value={userDetails.description} />
																</div>
																<div className="col-md-12">
																	<label> Profession:</label>
																	<input required required type="text" name="profession" onChange={(e) => handleChange(e)} placeholder="Profession"
																		value={userDetails.profession} />
																</div>
																<div className="col-md-12">
																	<label>Current password:</label>
																	<input required type="password" name="curPassword" onChange={(e) => handleChange(e)}
																		value={userDetails.curPassword} />
																	<div className='change_pwd_link' onClick={() => setShow_PasswordInput(!show_PasswordInput)}>Change Password</div>
																</div>
																{show_PasswordInput &&
																	<>
																		<div className="col-md-12">
																			<label>New password:</label>
																			<input required={show_PasswordInput ? true : false} type="password" name="newPassword" onChange={(e) => handleChange(e)}
																				value={userDetails.newPassword} />
																		</div>
																		<div className="col-md-12">
																			<label>Confirm new password:</label>
																			<input required={show_PasswordInput ? true : false} type="password" name="conPassword" onChange={(e) => handleChange(e)}
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
											{/* <div className="tab-pane fade" id="liton_tab_1_6">

											</div> */}
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