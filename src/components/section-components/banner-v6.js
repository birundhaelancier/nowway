import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { GetPropertyType } from '../apiActions/index';
import { APIURL, REQUEST_HEADERS } from "../../index";
import axios from 'axios';
import SelectInput from '../Select/index';


const BannerV6 = ({ property_type, location }) => {
	let publicUrl = process.env.PUBLIC_URL + '/';
	const initialValues = {
		mobile: "",
		password: "",
	};
	const [values, setValues] = useState(initialValues);
	const [login_id, setLogin_id] = useState();
	const [SearchValues, setSearchValues] = useState({ Property_Type: "", Location: "" })

	useEffect(() => {
		setLogin_id(JSON.parse(localStorage.getItem("user_id")))
	}, [])

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	// if (name === "mobile") {
	// 	// 	if (value.length !== 10) {
	// 	// 		setMobileErr(true)
	// 	// 	} else {
	// 	// 		setMobileErr(false)
	// 	// 	}
	// 	// }
	// 	setValues({
	// 		...values,
	// 		[name]: value,
	// 	});
	// }
	const handleChange = (data,key) => {
		
		setSearchValues({
			...SearchValues,
			[key]: data,
		});
	}

	const submitForm = async (e) => {
		e.preventDefault();

	}

	return (
		<div className="ltn__slider-area ltn__slider-4 position-relative  ltn__primary-bg parent_select">
			<div className="ltn__slide-one-active----- slick-slide-arrow-1----- slick-slide-dots-1----- arrow-white----- ltn__slide-animation-active">

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
													<a data-bs-toggle="tab" href="#ltn__form_tab_1_1" className><i className="fas fa-store" />Sale</a>
													<a className="tab" data-bs-toggle="tab" href="#ltn__form_tab_1_1"><i className="fab fa-algolia" />Buy</a>
												</div>
											</div>
											<div className="tab-content pb-10">
												<div className="tab-pane fade active show" id="ltn__form_tab_1_1">
													<div className="car-dealer-form-inner">
														<form action="#" className="ltn__car-dealer-form-box row" onSubmit={(e) => submitForm(e)}>
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-4 col-md-6">
																<SelectInput dropdown={property_type} placeholder={"Property Type"}
																	value={SearchValues.Property_Type}
																	//  value={Property_Type} 
																	changeData={(data) => handleChange(data, "select", "Property_Type")}
																	suffixicon={<i className="fa fa-car sel_icon" />}
																/>

															</div>
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-4 col-md-6">
																<SelectInput dropdown={location} placeholder={"Location"}
																	value={SearchValues.Location}
																	changeData={(data) => handleChange(data, "select", "Location")}
																	suffixicon={<i className="fa fa-map-marker sel_icon" />}
																/>

															</div>
															<div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-4 col-md-6">
																<div className="btn-wrapper text-center mt-0 go-top">
																	{/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
																	<Link to="/shop-right-sidebar" className="theme-btn-1 btn btn-block text-uppercase">Search</Link>
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
											<Link to={login_id ? "/add-listing" : "/login"} className="theme-btn-1 btn btn-block postBtn">Post Free Property ad</Link>
											{/* <button className="postBtn">Post Free Property ad</button> */}
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