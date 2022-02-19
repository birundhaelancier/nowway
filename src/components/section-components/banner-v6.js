import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { GetPropertyType } from '../apiActions/index';
import { APIURL, REQUEST_HEADERS } from "../../index";
import axios from 'axios';

const BannerV6 = ({ property_type, location }) => {
	let publicUrl = process.env.PUBLIC_URL + '/';
	// useEffect(() => {

	// }, [property_type])
	console.log(location,property_type, "property_type")

	return (
		<div className="ltn__slider-area ltn__slider-4 position-relative  ltn__primary-bg">
			<div className="ltn__slide-one-active----- slick-slide-arrow-1----- slick-slide-dots-1----- arrow-white----- ltn__slide-animation-active">

				{/* <video autoPlay muted loop id="myVideo">
				<source src={publicUrl+"assets/media/3.mp4"} type="video/mp4" />
			</video> */}

				<div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-7 bg-image--- bg-overlay-theme-black-30" data-bs-bg={publicUrl + "assets/img/slider/41.jpg"}>
					<div className="ltn__slide-item-inner text-center">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 align-self-center">
									<div className="slide-item-car-dealer-form">
										<div className="section-title-areas ltn__section-title-2 text-center">
											<h1 className="section-title  text-color-white">Find Your <span className="ltn__secondary-color-3">Perfect</span> Home</h1>
										</div>
										<div className="ltn__car-dealer-form-tab">
											<div className="ltn__tab-menu  text-uppercase text-center">
												<div className="nav">
													<a className="tab" data-bs-toggle="tab" href="#ltn__form_tab_1_1"><i className="fas fa-home" />Rent</a>
													<a data-bs-toggle="tab" href="#ltn__form_tab_1_2" className><i className="fas fa-store" />Sale</a>
													<a className="tab" data-bs-toggle="tab" href="#ltn__form_tab_1_1"><i className="fab fa-algolia" />Buy</a>
												</div>
											</div>
											<div className="tab-content pb-10">
												<div className="tab-pane fade active show" id="ltn__form_tab_1_1">
													<div className="car-dealer-form-inner">
														<form action="#" className="ltn__car-dealer-form-box row">
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-4 col-md-6">
																<select className="nice-select">
																	<option>Property Type</option>
																	{property_type?.map((data) => {
																		return (
																			<option>{data.name}</option>
																		)
																	})}
																</select>
															</div>
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-4 col-md-6">
																<select className="nice-select">
																	<option>Location</option>
																	{ location?.map((data) => {
																		return (
																			<option>{data.name}</option>
																		)
																	})}
																</select>
															</div>
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-4 col-md-6">
																<div className="btn-wrapper text-center mt-0 go-top">
																	{/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
																	<Link to="/shop-right-sidebar" className="btn theme-btn-1 btn-effect-1 text-uppercase">Search</Link>
																</div>
															</div>
														</form>
													</div>
												</div>
												<div className="tab-pane fade" id="ltn__form_tab_1_2">
													<div className="car-dealer-form-inner">
														<form action="#" className="ltn__car-dealer-form-box row">
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-3 col-md-6">
																<select className="nice-select">
																	<option>Property Type</option>
																	<option>Apartment</option>
																	<option>Co-op</option>
																	<option>Condo</option>
																	<option>Single Family Home</option>
																</select>
															</div>
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-3 col-md-6">
																<select className="nice-select">
																	<option>Location</option>
																	<option>chicago</option>
																	<option>London</option>
																	<option>Los Angeles</option>
																	<option>New York</option>
																	<option>New Jersey</option>
																</select>
															</div>
															{/* <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
															<select className="nice-select">
																<option>Sub Location</option>
																<option>Bayonne</option>
																<option>Greenville</option>
																<option>Manhattan</option>
																<option>Queens</option>
																<option>The Heights</option>
																<option>Upper East Side</option>
																<option>West Side</option>
															</select>
														</div> */}
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
																<div className="btn-wrapper text-center mt-0 go-top">
																	{/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
																	<Link to="/shop-right-sidebar" className="btn theme-btn-1 btn-effect-1 text-uppercase">Search</Link>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
										<div className='ad-property'>
											{/* <div className='outer'>
										</div> */}
											<h1 className="section-title  text-color-white">Are you a <span className="ltn__secondary-color-3">Property</span> Owner?</h1>
											{/* <div className='property-title'>Are you a <div className='owner'>Property</div> Owner?</div> */}
											{/* <li className="special-link">
									<Link to="/add-listing">Add Listing</Link>
								</li> */}
											<button className="postBtn">Post Free Property ad</button>
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

export default BannerV6