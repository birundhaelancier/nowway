import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Modal from '../Model';


const ShopDetails = ({ ProductInfo }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pro_details, setPro_details] = useState()
	useEffect(() => {
		setPro_details(ProductInfo)
	}, [ProductInfo])
	let publicUrl = process.env.PUBLIC_URL + '/'
	console.log(pro_details, "ProductInfo")
	return (
		<div className="ltn__shop-details-area pb-10">
			<div className="container">
				{pro_details?.map((data) => {
					return (
						<>
							<div className="row">
								<div className="col-lg-7 col-md-12">
									<div className="ltn__shop-details-inner ltn__page-details-inner">
										<div className="ltn__blog-meta">
											<ul>
												<li className="ltn__blog-category">
													<Link className="bg-orange" to="#">{data.type === "Rent" ? "For Rent" : "For Sell"}</Link>
												</li>
												<li className="ltn__blog-date">
													<i className="far fa-calendar-alt" />{data.available_from}
												</li>
											</ul>
										</div>
										<h1>{data.title}</h1>
										<label><span className="ltn__secondary-color"><i className="flaticon-pin" /></span>{data.state + ", " + data.city}</label>
										<h4 className="title-2">Description</h4>
										<p>{data.description}</p>
									</div>
								</div>
								<div className="col-lg-5">
									<aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
										<div className="widget ltn__menu-widget ltn__menu-widget-2--- ltn__menu-widget-2-color-2---">
											<h4 className="ltn__widget-title ltn__widget-title-border-2">Owner Details</h4>
											<div className='btn-icon-container'>
												<div className='div1'>
													<div className="ltn__blog-categorys">
														<button onClick={() => setIsModalVisible(true)} className="postBtn">Get Owner Details</button>
														{/* <Link to="#">Get Owner Details</Link> */}
													</div>
												</div>
												{/* <div className='div2'><i className="far fa-calendar-alt" /></div>
							<div className='div2'><i class="far fa-comment-alt"></i></div> */}
											</div>

											<div className="property-box">
												{/* <div> */}
												<div className='circle-icon'>
													<i class="fas fa-exclamation-circle"></i>
												</div>
												<div>
													<div className="propertyTitle">
														Report what was not correct in this property</div>
													<div className='property_btn'>
														<div className="ltn_list">
															<Link to="#">Listed by Broker</Link>
														</div>
														<div className="ltn_list">
															<Link to="#">Sold Out</Link>
														</div>
														<div className="ltn_list">
															<Link to="#">Wrong Info</Link>
														</div>
													</div>
												</div>
											</div>

											{/* </div> */}
										</div>
									</aside>

								</div>
								<Modal show={isModalVisible} handleClose={() => setIsModalVisible(false)}>
									<div className="ltn__quick-view-modal-inner">
										<div className="col-lg-12 text-center modalHeading">Owner Contact Details</div>
										<div className="container">
											<div className="row">
												<div className="col-lg-12 custom-model" >
													<div className='phone-info'>Owner Details send to your +984507289</div>
													<div className='phone-mail'>and nowway@gmail.com</div>
													<div className='owner-btn-show'>
														<button className='messegeBtn'>Messege Owner</button>
														<button className='propertyBtn'>Shedule Property Visit</button>
													</div>
												</div>
											</div>
										</div>
									</div>

								</Modal>
							</div>



							<div className="row">
								<div className="container">
									<div className="row">
										<div className="col-lg-7 col-md-12">
											<div className="ltn__shop-details-inner ltn__page-details-inner">
												<h4 className="title-2">Property Detail</h4>
												<div className="property-detail-info-list section-bg-1 clearfix mb-60">
													<ul>
														<li><label>Property ID:</label> <span>{data.code}</span></li>
														<li><label>Floors: </label> <span>{data.floors}</span></li>
														<li><label>Rooms:</label> <span>{data.rooms}</span></li>
														<li><label>Baths:</label> <span>2</span></li>
														<li><label>Year built:</label> <span>{data.year_built}</span></li>
													</ul>
													<ul>
														<li><label>Lot Area:</label> <span>HZ29 </span></li>
														<li><label>Lot dimensions:</label> <span>120 sqft</span></li>
														<li><label>Beds:</label> <span>{data.bedrooms}</span></li>
														<li><label>Price:</label> <span>{data.price}</span></li>
														<li><label>Garage Size:</label> <span>{data.garage_size}</span></li>
													</ul>
												</div>
												<h4 className="title-2">Facts and Features</h4>
												<div className="property-detail-feature-list clearfix mb-45">
													<ul>
														<li>
															<div className="property-detail-feature-list-item">
																<i className="flaticon-double-bed" />
																<div>
																	<h6>Living Room</h6>
																	<small>20 x 16 sq feet</small>
																</div>
															</div>
														</li>
														<li>
															<div className="property-detail-feature-list-item">
																<i className="flaticon-double-bed" />
																<div>
																	<h6>Garage</h6>
																	<small>20 x 16 sq feet</small>
																</div>
															</div>
														</li>
														<li>
															<div className="property-detail-feature-list-item">
																<i className="flaticon-double-bed" />
																<div>
																	<h6>Dining Area</h6>
																	<small>20 x 16 sq feet</small>
																</div>
															</div>
														</li>
														<li>
															<div className="property-detail-feature-list-item">
																<i className="flaticon-double-bed" />
																<div>
																	<h6>Bedroom</h6>
																	<small>20 x 16 sq feet</small>
																</div>
															</div>
														</li>
														<li>
															<div className="property-detail-feature-list-item">
																<i className="flaticon-double-bed" />
																<div>
																	<h6>Bathroom</h6>
																	<small>20 x 16 sq feet</small>
																</div>
															</div>
														</li>
														<li>
															<div className="property-detail-feature-list-item">
																<i className="flaticon-double-bed" />
																<div>
																	<h6>Gym Area</h6>
																	<small>20 x 16 sq feet</small>
																</div>
															</div>
														</li>
														<li>
															<div className="property-detail-feature-list-item">
																<i className="flaticon-double-bed" />
																<div>
																	<h6>Garden</h6>
																	<small>20 x 16 sq feet</small>
																</div>
															</div>
														</li>
														<li>
															<div className="property-detail-feature-list-item">
																<i className="flaticon-double-bed" />
																<div>
																	<h6>Parking</h6>
																	<small>20 x 16 sq feet</small>
																</div>
															</div>
														</li>
													</ul>
												</div>

												<h4 className="title-2 mb-10">Amenities</h4>
												<div className="property-details-amenities mb-60">
													<div className="row">
														<div className="col-lg-4 col-md-6">
															<div className="ltn__menu-widget">
																<ul>
																	<li>
																		<label className="checkbox-item">Air Conditioning
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Gym
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Microwave
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Swimming Pool
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">WiFi
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																</ul>
															</div>
														</div>
														<div className="col-lg-4 col-md-6">
															<div className="ltn__menu-widget">
																<ul>
																	<li>
																		<label className="checkbox-item">Barbeque
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Recreation
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Microwave
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Basketball Cout
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Fireplace
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																</ul>
															</div>
														</div>
														<div className="col-lg-4 col-md-6">
															<div className="ltn__menu-widget">
																<ul>
																	<li>
																		<label className="checkbox-item">Refrigerator
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Window Coverings
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Washer
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">24x7 Security
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																	<li>
																		<label className="checkbox-item">Indoor Game
																			<input type="checkbox" defaultChecked="checked" />
																			<span className="checkmark" />
																		</label>
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
												<div className="ltn__shop-details-tab-content-inner--- ltn__shop-details-tab-inner-2 ltn__product-details-review-inner mb-60">
												</div>
												<h4 className="title-2">Related Properties</h4>
												<div className="row">
													{/* ltn__product-item */}
													<div className="col-xl-6 col-sm-6 col-12 go-top">
														<div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
															<div className="product-img">
																<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																<div className="real-estate-agent">
																	<div className="agent-img">
																		<Link to="/product-details"><img src={publicUrl + "assets/img/blog/author.jpg"} alt="#" /></Link>
																	</div>
																</div>
															</div>
															<div className="product-info">
																<div className="product-badge">
																	<ul>
																		<li className="sale-badg">For Rent</li>
																	</ul>
																</div>
																<h2 className="product-title"><Link to="/#">New Apartment Nice View</Link></h2>
																<div className="product-img-location">
																	<ul>
																		<li>
																			<Link to="/#"><i className="flaticon-pin" /> Belmont Gardens, Chicago</Link>
																		</li>
																	</ul>
																</div>
																<ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
																	<li><span>3 </span>
																		Bedrooms
																	</li>
																	<li><span>2 </span>
																		Bathrooms
																	</li>
																	<li><span>3450 </span>
																		square Ft
																	</li>
																</ul>
																<div className="product-hover-action">
																	<ul>
																		<li>
																			<a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
																				<i className="flaticon-expand" />
																			</a>
																		</li>
																		<li>
																			<a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
																				<i className="flaticon-heart-1" /></a>
																		</li>
																		<li>
																			<Link to="/#" title="Compare">
																				<i className="flaticon-add" />
																			</Link>
																		</li>
																	</ul>
																</div>
															</div>
															<div className="product-info-bottom">
																<div className="product-price">
																	<span>₹349,00<label>/Month</label></span>
																</div>
															</div>
														</div>
													</div>
													{/* ltn__product-item */}
													<div className="col-xl-6 col-sm-6 col-12 go-top">
														<div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
															<div className="product-img">
																<Link to="/#"><img src={publicUrl + "assets/img/product-3/2.jpg"} alt="#" /></Link>
																<div className="real-estate-agent">
																	<div className="agent-img">
																		<Link to="/product-details"><img src={publicUrl + "assets/img/blog/author.jpg"} alt="#" /></Link>
																	</div>
																</div>
															</div>
															<div className="product-info">
																<div className="product-badge">
																	<ul>
																		<li className="sale-badg">For Sale</li>
																	</ul>
																</div>
																<h2 className="product-title"><Link to="/#">New Apartment Nice View</Link></h2>
																<div className="product-img-location">
																	<ul>
																		<li>
																			<Link to="/#"><i className="flaticon-pin" /> Belmont Gardens, Chicago</Link>
																		</li>
																	</ul>
																</div>
																<ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
																	<li><span>3 </span>
																		Bedrooms
																	</li>
																	<li><span>2 </span>
																		Bathrooms
																	</li>
																	<li><span>3450 </span>
																		square Ft
																	</li>
																</ul>
																<div className="product-hover-action">
																	<ul>
																		<li>
																			<a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
																				<i className="flaticon-expand" />
																			</a>
																		</li>
																		<li>
																			<a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
																				<i className="flaticon-heart-1" /></a>
																		</li>
																		<li>
																			<a href="portfolio-details.html" title="Compare">
																				<i className="flaticon-add" />
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
															<div className="product-info-bottom">
																<div className="product-price">
																	<span>₹349,00<label>/Month</label></span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-5">
											<aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
												{/* Author Widget */}
												<div className="widget ltn__author-widget">
													<div className="ltn__author-widget-inner text-center">
														<img src={publicUrl + "assets/img/team/4.jpg"} alt="Image" />
														<h5>{data.user_name}</h5>
														<small>Traveller/Photographer</small>
														<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis distinctio, odio, eligendi suscipit reprehenderit atque.</p>
													</div>
												</div>

												{/* Menu Widget (Category) */}
												<div className="widget ltn__menu-widget ltn__menu-widget-2--- ltn__menu-widget-2-color-2---">
													<h4 className="ltn__widget-title ltn__widget-title-border-2">Top Categories</h4>
													<ul className="go-top">
														<li><Link to="/#">Apartments <span>(26)</span></Link></li>
														<li><Link to="/#">Picture Stodio <span>(30)</span></Link></li>
														<li><Link to="/#">Office  <span>(71)</span></Link></li>
														<li><Link to="/#">Luxary Vilas <span>(56)</span></Link></li>
														<li><Link to="/#">Duplex House <span>(60)</span></Link></li>
													</ul>
												</div>

												{/* Tagcloud Widget */}
												<div className="widget ltn__tagcloud-widget go-top">
													<h4 className="ltn__widget-title ltn__widget-title-border-2">Popular Tags</h4>
													<ul>
														<li><Link to="/#">Popular</Link></li>
														<li><Link to="/#">desgin</Link></li>
														<li><Link to="/#">ux</Link></li>
														<li><Link to="/#">usability</Link></li>
														<li><Link to="/#">develop</Link></li>
														<li><Link to="/#">icon</Link></li>
														<li><Link to="/#">Car</Link></li>
														<li><Link to="/#">Service</Link></li>
														<li><Link to="/#">Repairs</Link></li>
														<li><Link to="/#">Auto Parts</Link></li>
														<li><Link to="/#">Oil</Link></li>
														<li><Link to="/#">Dealer</Link></li>
														<li><Link to="/#">Oil Change</Link></li>
														<li><Link to="/#">Body Color</Link></li>
													</ul>
												</div>
												{/* Banner Widget */}
												<div className="widget ltn__banner-widget d-none go-top">
													<Link to="/#"><img src={publicUrl + "assets/img/banner/2.jpg"} alt="#" /></Link>
												</div>
											</aside>
										</div>
									</div>
								</div>
							</div>
						</>
					)
				})}
			</div>

		</div>
	)
}
export default ShopDetails;