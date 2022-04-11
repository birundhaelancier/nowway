import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { GetUserDetails, UpdateUserDetails, GetContachDetails, GetMyList, GetWishlist, RemoveWishlist, GetWalletList, GetServiceEnquiry } from '../apiActions/index';
import { notification } from 'antd';
import Modal from '../Model';
import Error from "../section-components/error";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
// import proImg from '../../../public/assets/img/profilenew.jpg';

const MyAccount = ({ wishnumber }) => {
	let publicUrl = process.env.PUBLIC_URL + '/'
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
	let history=useHistory()
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
	const [servicemodal,setservicemodal]=useState(false)
	const [service, setService] = useState([]);
    const [serviceDetails, setserviceDetails] = useState([]);
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
		GetServiceEnquiry().then((res) => {
			setService(res.Response)
			console.log(res, "GetServiceEnquiry")
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
						Swal.fire({
							title: 'Success!',
							icon: 'success',
							text: response.Message,
						})
						setShow_PasswordInput(false)
					} else {
						Swal.fire({
							title: 'Failed!',
							icon: 'error',
							text: response.Message,
						})
					}
				})

			} else {
				Swal.fire({
					title: 'Failed!',
					icon: 'error',
					text:"Not Match the Confirm Password",
				})
			}
		} else {
			UpdateUserDetails(userDetails, picture, show_PasswordInput).then((response) => {
				if (response.Status == "Success") {
					Swal.fire({
						title: 'Success!',
						icon: 'success',
						text: response.Message,
					})
					setShow_PasswordInput(false)
				} else {
					Swal.fire({
						title: 'Failed!',
						icon: 'error',
						text: response.Message,
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

	const selectSubserivce = (data,type) => {
		if(type==="service"){
			setservicemodal(true)
			setIsModalVisible(false)
		    setserviceDetails(data)

		}else{
		setIsModalVisible(true)
		}
		setUserInfo(data)
	}

	const removeWishlist = (id) => {
		RemoveWishlist(id).then((data) => {
			if (data.Status == "Success") {
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: "Removed Successfully",
				})
				setTimeout(()=>{
					window.location.reload();
				},4000)
			} else {
				Swal.fire({
					title: 'Failed!',
					icon: 'error',
					text: data.Message,
				})
			}
		})
		setRefresh(true);
	}
	console.log(serviceDetails, "tranaction")

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
												<a data-bs-toggle="tab" className={wishnumber != 1 && wishnumber != 2 && "active show"} href="#liton_tab_1_1">Account Details <i className="fas fa-home" /></a>
												<a data-bs-toggle="tab" className={wishnumber == 1 && "active show"} href="#liton_tab_1_2">Wishlist <i className="fas fa-heart" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_0">Contacted <i className="fas fa-phone" /></a>
												<a data-bs-toggle="tab" className={wishnumber == 2 && "active show"}href="#liton_tab_1_4">My Property <i className="fas fa-list" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_5">NW Cash <span style={{ fontSize: "24px" }}>₹</span></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_6">Service Enquiry <i className="fa fa-rocket" /></a>
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
																						<Link to={`/product-details?product_id=${list.id}`}><img src={list.image[0]?list.image[0]:publicUrl+"assets/img/no_image.jpg"} alt="#" style={{width:"100%",height:"180px",objectFit:"cover"}}/></Link>
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
											<div className="tab-pane fade"  id="liton_tab_1_0">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															{contact_list.length > 0 ?
																<>
																	{contact_list.map((data, index) => {
																		return (
																			<div className='grid-Show'>
																				<div className="product-img go-top">
																					<Link to={`/product-details?product_id=${data.id}`}><img src={data.image[0]?data.image[0]:publicUrl+"assets/img/no_image.jpg"} alt="#" style={{width:"100%",height:"180px",objectFit:"cover"}}/></Link>
																					<div className="product-badge re-content">
																						<button className={data.type === "Rent" ? "sale-badge bg-green" : "sale-badge-sell"}>{data.type === "Rent" ? "Rent" : "Sell"}</button>
																					</div>
																				</div>
																				<div className='cont-amount'>
																					<div className='nw-amount'>₹{data.price}</div>
																					{/* <div>Kamarajar Street, Madurai</div> */}
																					<div>{data.user_email}</div>
																				</div>
																				<div className='cont-address'>
																					<div className='icon'> <i class="fas fa-user"></i> {data.user_name}</div>
																					<div className='icon'> <i class="fas fa-phone"></i>{data.user_mobile}</div>
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
											<div  className={`tab-pane fade ${wishnumber == 2 && "active show"}`} id="liton_tab_1_4">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															{home_list.length > 0 ?
																<>
																	{home_list.map((data, index) => {
																		return (
																			<div className='grid-Show'>
																				<div className="product-img go-top">
																					<Link to={`/product-details?product_id=${data.id}`}><img src={data.image[0]?data.image[0]:publicUrl+"assets/img/no_image.jpg"} alt="#" style={{width:"100%",height:"180px",objectFit:"cover"}}/></Link>
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
																						className='lisu_number'>{data.city}</div>
																				</div>
																				<div className='list_more'>
																					<button className='more_btn' onClick={() => selectSubserivce(data)}>More Details</button>
																					<button className='edit_btn' onClick={()=>history.push(`/add-listing/${data.id}`)}>Edit</button>
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
												<Modal show={isModalVisible || servicemodal} modelTitle={servicemodal?"Service Details":"Property Details"} handleClose={() =>{setIsModalVisible(false);setservicemodal(false)}} width={servicemodal?800:900}>

													{!servicemodal?<div className="ltn__quick-view-modal-inner ">
														{/* <div className="col-lg-12 text-center modalHeading"></div> */}
														<div className='modal_content-view'>
															<div className="container">
																<div className="row">
																	<div className="col-md-12 showProfile">
																		<img src={picture?picture:publicUrl+"assets/img/no_image.jpg"} alt=" " className="showUpload" />
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
																	<h6>Property Details</h6>
																	<div className="property-detail-info-list section-bg-1 clearfix mb-10 property">
																		<ul>
																			<li><label>Property ID:</label> <span>{userInfo.code || "-"}</span></li>
																			<li><label>Property Type: </label> <span>{userInfo.property_type || "-"}</span></li>
																			{/* <li><label>Structure Type:</label> <span>{userInfo.structure_type || "-"}</span></li> */}
																			<li><label>Baths:</label> <span>{userInfo.bathroom || "-"}</span></li>
																			<li><label>Availabilty: </label> <span>{userInfo.availability || "-"}</span></li>
																			<li><label>Floors: </label> <span>{userInfo.floors || "-"}</span></li>
																			<li><label>Price:</label> <span>{userInfo.price || "-"}</span></li>

																			{/* <li><label>Rooms:</label> <span>{userInfo.rooms || "-"}</span></li> */}

																		</ul>

																				<ul className='extra_info'>
																			<li><label>Amenities  :</label> <span>{userInfo.amenities || "-"}</span></li>
																			<li><label>Furnishing  :</label> <span>{userInfo.furnishing || "-"}</span></li>
																			<li><label>Parking  :</label> <span>{userInfo.parking || "-"} </span></li>
																			<li><label>Tenants  :</label> <span>{userInfo.tenants || "-"} </span></li>
																		
																		</ul>
																	</div>
																	<div>
																	
																	</div>

																</div>
															</div>
														</div>
													</div>:
													<>
													{serviceDetails?.service_details.map((data,index)=>{
                
               return(
													<div className="service_pay_parent">
              <img src={data.image} style={{ width: "100px", height: "100px",objectFit:"cover" }}/>
              <div>
                <label>{data.product_name}</label>
                <div className="amt_ch">
                  <label>{data.qty}x{"₹"+data.price}</label>
                </div>
				<label>NWcash:₹{data.nwcash}</label>
              </div>
            </div>
			   )})} 
			   <div className="property-detail-info-list section-bg-1 clearfix mb-10 property">
																		<ul>
																			<li><label>Name</label> <span>{serviceDetails.name || "-"}</span></li>
																			<li><label>Place </label> <span>{serviceDetails.place || "-"}</span></li>
																			<li><label>Email</label> <span>{serviceDetails.email || "-"}</span></li>
																			<li><label>Mobile</label> <span>{serviceDetails.mobile || "-"}</span></li>
																			<li><label>Pincode</label> <span>{serviceDetails.pincode || "-"}</span></li>
																			<li><label>Date </label> <span>{serviceDetails.d_date || "-"}</span></li>
																			<li><label>Time Slot </label> <span>{serviceDetails.time_slot || "-"}</span></li>
																			

																		</ul>
																		{/* <>Cart Details</> */}
																		<ul>
																		<li><label>Sub Total</label> <span>{serviceDetails.sub_total || "-"}</span></li>
																			<li><label>Total</label> <span>{serviceDetails.total || "-"}</span></li>
																			<li><label>NW Cash</label> <span>{serviceDetails.total_nw || "-"}</span></li>
																		</ul>
																		</div>
			   </>}
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
												<div className="ltn__myaccount-tab-content-inner ">
													<div className="ltn__form-box acc_details_form">
														<form onSubmit={(e) => submitForm(e)} >
															<div className="row mb-50">
																<div className="col-md-12 profile_show">
																	<div className="filecontainer" onClick={fileclick}>
																		<div className="uploads">
																			<input required={picture ? false : true} id="profilePic" type="file" onChange={(e) => onChangePicture(e)} className="fileinput hidden" ref={inputElement} />

																			<img src={picture ? picture : publicUrl + "assets/img/profilenew.jpg"} alt=" " className="uploadimage" />
																		</div>
																		<div className='uploadBtn'>
																			<i class="fa fa-upload" aria-hidden="true"></i>
																		</div>
																	</div>
																</div>
																<div className="col-md-6">
																	<label className='label_ac_name'>First name:</label>
																	<input required type="text" name="fname" onChange={(e) => handleChange(e)}
																		value={userDetails.fname} />
																</div>
																<div className="col-md-6">
																	<label  className='label_ac_name'>Last name:</label>
																	<input required type="text" name="lname" onChange={(e) => handleChange(e)}
																		value={userDetails.lname} />
																</div>
																<div className="col-md-6">
																	<label  className='label_ac_name'>Display Name:</label>
																	<input required type="text" name="name" onChange={(e) => handleChange(e)} placeholder="display name"
																		value={userDetails.name} />
																</div>
																<div className="col-md-6">
																	<label  className='label_ac_name'>Display Email:</label>
																	<input required type="email" name="email" onChange={(e) => handleChange(e)}
																		value={userDetails.email} />
																</div>
																<div className="col-md-12">
																	<label  className='label_ac_name'>Bio:</label>
																	<textarea type="text" name="description" onChange={(e) => handleChange(e)}
																		value={userDetails.description} />
																</div>
																<div className="col-md-12">
																	<label  className='label_ac_name'> Profession:</label>
																	<input required  type="text" name="profession" onChange={(e) => handleChange(e)} placeholder="Profession"
																		value={userDetails.profession} />
																</div>
																<div className="col-md-12">
																	<label  className='label_ac_name'>Current password:</label>
																	<input required type="password" name="curPassword" onChange={(e) => handleChange(e)}
																		value={userDetails.curPassword} />
																	<div className='change_pwd_link' onClick={() => setShow_PasswordInput(!show_PasswordInput)}>Change Password</div>
																</div>
																{show_PasswordInput &&
																	<>
																		<div className="col-md-12">
																			<label  className='label_ac_name'>New password:</label>
																			<input required={show_PasswordInput ? true : false} type="password" name="newPassword" onChange={(e) => handleChange(e)}
																				value={userDetails.newPassword} />
																		</div>
																		<div className="col-md-12">
																			<label  className='label_ac_name'>Confirm new password:</label>
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
											<div className="tab-pane fade" id="liton_tab_1_6">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															{service.length > 0 ?
																<>
																	{service.map((data, index) => {
																		return (
																			<div className='grid-Showservice'>
																				<div className='cont-amount'>
																					<div className='list_username'>{data.name}</div>
																					<div className='lisu_number'>{data.user_mobile}</div>
																					<div className='lisu_number'>Service Name: {data.service}</div>
																					<div className='lisu_number'>Place: {data.place}</div>
																					<div className='lisu_number'>Date: {data.d_date}</div>
																				</div>
																				<div className='list_more'>
																				    {data.stype==="Service"?<button className='more_btn' onClick={() => selectSubserivce(data,"service")}>View</button>:""}
																					<button className={data.status === "Pending"? "pendinShow":data.status === "Rejected"?"reject":"edit_btn"} onClick={() => selectSubserivce(data)}>{data.status}</button>
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