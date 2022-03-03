import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { GetUserDetails, UpdateUserDetails, GetContachDetails, GetMyList, GetWishlist, RemoveWishlist, GetWalletList } from '../apiActions/index';
import { notification } from 'antd';
import Modal from '../Model';
import Error from "../section-components/error";

const MyAccount = ({ wishnumber }) => {
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
	const [picture, setPicture] = useState(null);
	const inputElement = useRef(null);
	const [home_list, setHome_list] = useState([])
	const [contact_list, setContact_list] = useState([])
	const [wish_list, setWish_list] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [userInfo, setUserInfo] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [tranaction, setTransaction] = useState(false);

	const proImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="

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
		GetWalletList().then((response) => {
			setTransaction(response.Response)
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

	const removeWishlist = (id) => {
		RemoveWishlist(id).then((data) => {
			if (data.Status == "Success") {
				notification.success({
					message: "Removed Successfully"
				})
				window.location.reload();
			} else {
				notification.error({
					message: data.Message
				})
			}
		})
		setRefresh(true);
	}
	console.log(tranaction, "tranaction")

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
												<a data-bs-toggle="tab" className={wishnumber != 1 && "active show"} href="#liton_tab_1_1">Account Details <i className="fas fa-home" /></a>
												<a data-bs-toggle="tab" className={wishnumber == 1 && "active show"} href="#liton_tab_1_2">Wishlist <i className="fas fa-heart" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_0">Contacted <i className="fas fa-phone" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_4">My Property <i className="fas fa-list" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_5">NW Cash <span style={{fontSize:"24px"}}>₹</span></a>
												<Link className="go-top" to={`/login?edit=${"user_id"}`}>Logout <i className="fas fa-sign-out-alt" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="tab-content">
											<div className={`tab-pane fade ${wishnumber == 1 && "active show"}`} id="liton_tab_1_2">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															{wish_list.length > 0 ?
																<>
																	{
																		wish_list.map((list, index) => {
																			return (
																				<div className='grid-Shows'>
																					<div className='up-cross' onClick={() => removeWishlist(list.id)}><i class="far fa-window-close"></i></div>
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
																					<div className='low-cross'
																						onClick={() => removeWishlist(list.id)}><i class="far fa-window-close"></i></div>

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
																					<div className='lisu_number'>Viewers: {data.views}</div>
																					<div className='lisu_number'>Contacted: {data.contacted}</div>
																					<div
																						className='lisu_number'>{data.city + ", " + data.state + " - " + data.zip}</div>
																				</div>
																				<div className='list_more'>
																					<button className='more_btn' onClick={() => selectSubserivce(data)}>More Details</button>
																					<button className='edit_btn' >Edit</button>
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
														<div className="col-lg-12 text-center modalHeading">Property Details</div>
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
													<div className="table-responsive">
														<div className='contact-container'>
															<div className='col-lg-12'>
																<div className='my-heading'>My Recent Transactions </div>
																{tranaction.length > 0 ?
																	<>
																		{tranaction.map((data) => {
																			return (
																				<div className='col-lg-12'>
																					<div className='nb__1S0gN'>Total Balance</div>
																					<div className='col-lg-12 nb__U6FD_'>
																						{/* <img src={img3} /> */}
																						<div className='nb__U6FD_'>
																							<div className='col-lg-9 nb__8kQ5D'>
																								<div>{data.type + " - " + data.d_date}</div>
																								<button className={data.ctype === "Credit" ? "bg-green" : "bg-pink"}>{data.ctype}</button>
																								<div className='nb__1ip5'>  sale available on the website, we can match you with a house you will want to call home</div>
																							</div>
																							<div className='col-lg-3 nb__ykf7e'>+₹{data.amount}</div>

																						</div>
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
											</div>
											<div className={`tab-pane fade ${wishnumber != 1 && "active show"}`} id="liton_tab_1_1">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="ltn__form-box">
														<form onSubmit={(e) => submitForm(e)}>
															<div className="row mb-50">
																<div className="col-md-12 profile_show">
																	<div className="filecontainer" onClick={fileclick}>
																		<div className="uploads">
																			<input required id="profilePic" type="file" onChange={(e) => onChangePicture(e)} className="fileinput hidden" ref={inputElement} />

																			<img src={picture == null ? proImg : picture} alt=" " className="uploadimage" />
																		</div>
																		<div className='uploadBtn'>
																			<i class="fa fa-upload" aria-hidden="true"></i>
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