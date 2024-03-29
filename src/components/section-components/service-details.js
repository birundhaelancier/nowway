import React, { Component, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import Modal from '../Model';
import { AddSubServiceEnquiry } from '../apiActions/index';
import { notification } from "antd";


const ServiceDetails = ({ sub_services }) => {
	let history = useHistory()
	let publicUrl = process.env.PUBLIC_URL + '/'
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [kitchenModelopen, setKitchenModelopen] = useState(false)
	const [bathroomModelopen, setBathroomModelopen] = useState(false)	
	const [mobileErr, setMobileErr] = useState(false)

	const initialValues = {
		name: "",
		mobile: "",
		place: "",
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
		AddSubServiceEnquiry(values).then((data) => {
			console.log(data.Response,)
			if (data.Status == "Success") {
				notification.success({
					message: data.Message
				})
				setIsModalVisible(false)
			} else {
				notification.error({
					message: data.Message
				})
			}
		})
	}

	return (
		<div className="ltn__page-details-area ltn__service-details-area">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="ltn__page-details-inner ltn__service-details-inner">
							<div className="ltn__blog-img">
								<img className='serviceImage' src={sub_services && sub_services[0]?.image} alt="Image" />
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<aside className="sidebar-area ltn__right-sidebar">
							{/* Menu Widget */}
							<div className="widget-2 ltn__menu-widget ltn__menu-widget-2 text-uppercase">
								<ul className="go-top">
									{sub_services?.map((data) => {
										return (
											<li>
												<button className='side-btn-show' onClick={() => setIsModalVisible(true)}>
													<div>
														{data.name}</div>
													<div>
														<span><i className="fas fa-arrow-right" /></span>
													</div>
												</button>
											</li>
										)
									})}

									{/* <li >
										<button className='side-btn-show' onClick={() => setBathroomModelopen(true)}>
											<div>
												Bathroom Cleaning</div>
											<div>
												<span><i className="fas fa-arrow-right" /></span>
											</div>
										</button>
									</li>
									<li>
										<button className='side-btn-show' onClick={() => setKitchenModelopen(true)}>
											<div>
												Kitchen Cleaning</div>
											<div>
												<span><i className="fas fa-arrow-right" /></span>
											</div>
										</button>
									</li> */}
								</ul>
							</div>
						</aside>
						<div className="ltn__modal-area ltn__quick-view-modal-area">
							<div className="modal fade" id="quick_view_modal" >
								<div className="modal-dialog modal-lg" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">×</span>
												{/* <i class="fas fa-times"></i> */}
											</button>
										</div>
										<div className="modal-body">
											<div className="ltn__quick-view-modal-inner">
												<div className="modal-product-item">
													<div className="row">
														<div className="col-lg-6 col-12">
															<div className="modal-product-img">
																<img src={publicUrl + "assets/img/product/4.png"} alt="#" />
															</div>
														</div>
														<div className="col-lg-6 col-12">
															<div className="modal-product-info">
																<div className="product-ratting">
																	<ul>
																		<li><a href="#"><i className="fas fa-star" /></a></li>
																		<li><a href="#"><i className="fas fa-star" /></a></li>
																		<li><a href="#"><i className="fas fa-star" /></a></li>
																		<li><a href="#"><i className="fas fa-star-half-alt" /></a></li>
																		<li><a href="#"><i className="far fa-star" /></a></li>
																		<li className="review-total"> <a href="#"> ( 95 Reviews )</a></li>
																	</ul>
																</div>
																<h3>Brake Conversion Kit</h3>
																<div className="product-price">
																	<span>₹149.00</span>
																	<del>₹165.00</del>
																</div>
																<div className="modal-product-meta ltn__product-details-menu-1">
																	<ul>
																		<li>
																			<strong>Categories:</strong>
																			<span className="go-top">
																				<Link to="/blog">Parts</Link>
																				<Link to="/blog">Car</Link>
																				<Link to="/blog">Seat</Link>
																				<Link to="/blog">Cover</Link>
																			</span>
																		</li>
																	</ul>
																</div>
																<div className="ltn__product-details-menu-2">
																	<ul>
																		<li>
																			<div className="cart-plus-minus">
																				<input type="text" defaultValue="02" name="qtybutton" className="cart-plus-minus-box" />
																			</div>
																		</li>
																		<li>
																			<a href="#" className="theme-btn-1 btn btn-effect-1" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
																				<i className="fas fa-shopping-cart" />
																				<span>ADD TO CART</span>
																			</a>
																		</li>
																	</ul>
																</div>
																<hr />
																<div className="ltn__social-media">
																	<ul>
																		<li>Share:</li>
																		<li><a href="#" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
																		<li><a href="#" title="Twitter"><i className="fab fa-twitter" /></a></li>
																		<li><a href="#" title="Linkedin"><i className="fab fa-linkedin" /></a></li>
																		<li><a href="#" title="Instagram"><i className="fab fa-instagram" /></a></li>
																	</ul>
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
			</div>
			<Modal show={isModalVisible} handleClose={() => setIsModalVisible(false)}>
				<div className="ltn__quick-view-modal-inner">
					{/* <div className="container">
						<div className="row"> */}
					<div className="col-lg-12 text-center modalHeading">House Service</div>
					{/* </div>
						</div> */}
					<div className="container">
						<div className="row">
							<div className="col-lg-4 text-center">
								<div className="account-create text-start ">
									<img className='homeimage' src={publicUrl + "assets/img/homehand.jpg"} />
									<div className='listed'>
										<div className="text-start">
											<h6 className="section-titles">House Cleaning</h6>
										</div>
										<ul>
											<li>Lowest Price</li>
											<li>Top Quality</li>
											<li>Reschedule</li>
											<li>Co-Ordination</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-lg-8 text-center formShow">
								<div className="account-login-inner">
									<form className="form-input-box" onSubmit={(e) => submitForm(e)}>
										<input type="text" name="name" onChange={(e) => handleChange(e)}  required placeholder="Name*" />
										<input type="number" name="mobile" onChange={(e) => handleChange(e)}  required placeholder="Mobile Number*" />
										{mobileErr && <div className='errMsgmodel'>Mobile Number should be 10 digit only</div>}
										<input type="text" name="place" onChange={(e) => handleChange(e)}  required placeholder="Place*" />
										<div className="btn-wrapper mt-0">
									<button className="theme-btn-1 btn btn-block">save</button>
								</div>
									</form>
								</div>
							</div>

						</div>
					</div>
				</div>

			</Modal>

			<Modal show={bathroomModelopen} handleClose={() => setBathroomModelopen(false)}>
				<div className="ltn__quick-view-modal-inner">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 text-center">
								<div className="account-create text-start ">
									<img className='homeimage' src={publicUrl + "assets/img/homehand.jpg"} />
									<div className='listed'>
										<div className="text-start">
											<h6 className="section-titles">Bathroom Cleaning</h6>
										</div>
										<ul>
											<li>Lowest Price</li>
											<li>Top Quality</li>
											<li>Reschedule</li>
											<li>Co-Ordination</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-lg-8 text-center formShow">
								<div className="account-login-inner">
									<form method="GET" className="form-input-box">
										<input type="text" name="email" placeholder="Email*" />
										<input type="text" name="place" placeholder="Place*" />
										<input type="text" name="mobile" placeholder="Mobile Number*" />
										<div className="btn-wrapper go-top">
											<Link to="/plan" className="theme-btn-1 btn-show black-btn">Check Prices</Link>
										</div>
									</form>
								</div>
							</div>

						</div>
					</div>
				</div>

			</Modal>

			<Modal show={kitchenModelopen} handleClose={() => setKitchenModelopen(false)}>
				<div className="ltn__quick-view-modal-inner">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 text-center">
								<div className="account-create text-start ">
									<img className='homeimage' src={publicUrl + "assets/img/homehand.jpg"} />
									<div className='listed'>
										<div className="text-start">
											<h6 className="section-titles">Bathroom Cleaning</h6>
										</div>
										<ul>
											<li>Lowest Price</li>
											<li>Top Quality</li>
											<li>Reschedule</li>
											<li>Co-Ordination</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-lg-8 text-center formShow">
								<div className="account-login-inner">
									<form method="GET" className="form-input-box">
										<input type="text" name="email" placeholder="Email*" />
										<input type="text" name="place" placeholder="Place*" />
										<input type="text" name="mobile" placeholder="Mobile Number*" />
										<div className="btn-wrapper go-top">
											<Link to="/plan" className="theme-btn-1 btn-show black-btn">Check Prices</Link>
										</div>
									</form>
								</div>
							</div>

						</div>
					</div>
				</div>

			</Modal>

		</div>
	)

}
export default ServiceDetails;