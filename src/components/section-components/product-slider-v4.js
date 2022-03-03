import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Slider from "react-slick";
import { notification, Popconfirm } from 'antd'
import { Add_WishList, GetWishlist, RemoveWishlist } from '../apiActions'
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom'
const ProductSliderV4 = ({ list, callWish }) => {
	let history = useHistory()
	const [slideNumber, setSlideNumber] = useState(3)
	const [wish_list, setWish_list] = useState([])

	let publicUrl = process.env.PUBLIC_URL + '/'
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: slideNumber,
		slidesToScroll: 1,
	};
	useEffect(() => {
		if (window.innerWidth >= 550 && window.innerWidth <= 1000) {
			setSlideNumber(2)
		} else if (window.innerWidth < 549) {
			setSlideNumber(1)
		} else if (window.innerWidth >= 1001) {
			setSlideNumber(3)
		}
	}, [slideNumber])

	useEffect(() => {
		GetWishlist().then((response) => {
			let arrVal = []
			response.Response.forEach((data) => {
				arrVal.push(data.id)
			})
			setWish_list(arrVal)
		})
	}, [])

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
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/16456040931180807696.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645604156917821097.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" },
		{ img: "https://elancier.in/nowway/public/upload/offer/1645603970848248301.jpg" }
	]
	const AddWishlist = (id) => {
		if (JSON.parse(localStorage.getItem("user_id"))) {
			Add_WishList(id).then((res) => {
				if (res.Status === "Success") {
					notification.success({
						message: "Wishlist Added Successfully"
					})
					callWish("success")
          setTimeout(()=>{
            window.location.reload();
          },2000)
				} else {
					notification.success({
						message: "Something went wrong not added in your wishlist"
					})
				}
			})
		}
		else {
			history.push('/login')
		}
	}
	const removeWishlist = (id) => {
		RemoveWishlist(id).then((data) => {
			if (data.Status == "Success") {
				notification.success({
					message:"Removed Successfully"
				})
        setTimeout(()=>{
          window.location.reload();
        },2000)
			} else {
				notification.error({
					message: data.Message
				})
			}
		})
	}
	return (

    <div>
      <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2--- text-center">
                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                  Properties
                </h6>
                <h1 className="section-title">Latest Listings</h1>
              </div>
            </div>
          </div>

					<div className="row">
						<div className="col-lg-12 product-slider-container">
							{ }
							<Slider {...settings} arrows={true}>
								{list?.map((item, index) => {
									return (
										<div className="col-xl-4 col-sm-6 col-12">
											<div className="ltn__product-item ltn__product-item-4 text-center---">
												{/* product-details?product_id=${item.id} */}
												<div className="product-img go-top">
													<Link to={`/product-details?product_id=${item.id}`}><img src={item.image[0]} alt="#" /></Link>
													<div className="product-badge">
														<ul>
															<li className={item.type === "Rent" ? "sale-badge bg-green" : "sale-badge bg-pink"}>{item.type === "Rent" ? "For Rent" : "For Sell"}</li>
														</ul>
													</div>
													<div className="product-img-location-gallery">
														<div className="product-img-location">
															<ul>
																<li>
																	<Link to={`/#`}><i className="flaticon-pin" /> {item.state + ", " + item.city}</Link>
																</li>
															</ul>
														</div>
														<div className="product-img-gallery go-top">
															<ul>
																<li>
																	<Link to={`/#`}><i className="fas fa-camera" /> 4</Link>
																</li>
																<li>
																	<Link to={`/#`}><i className="fas fa-film" /> 2</Link>
																</li>
															</ul>
														</div>
													</div>
												</div>
												<div className="product-info">
													<div className="product-price">
														<span>₹{item.price}<label>/Month</label></span>
													</div>
													<h2 className="product-title go-top"><Link to={`/#`}>{item.tit}</Link></h2>
													<div className="product-description">
														<p>{item.description}</p>
													</div>
													<ul className="ltn__list-item-2 ltn__list-item-2-before">
														<li><span>{item.bedrooms} <i className="flaticon-bed" /></span>
															Bedrooms
														</li>
														<li><span>{item.bathroom} <i className="flaticon-clean" /></span>
															Bathrooms
														</li>
														<li><span>{item.size} <i className="flaticon-square-shape-design-interface-tool-symbol" /></span>
															square Ft
														</li>
													</ul>
												</div>
												<div className="product-info-bottom">
													<div className="real-estate-agent">
														<div className="agent-img go-top">
															<Link to={`/product-details?product_id=${item.id}`}><img src={item?.user_image || publicUrl + "assets/img/blog/author.jpg"} alt="#" style={{width:"40px",height:"40px"}}/></Link>
														</div>
														<div className="agent-brief go-top">
															<h6>{item.user_name}</h6>
															{/* <small>Estate Agents</small> */}
														</div>
													</div>
													<div className="product-hover-action">
														<ul>
															<li>
																<Link to={`/product-details?product_id=${item.id}`} title="Quick View">
																	{/* data-bs-toggle="modal" data-bs-target="#quick_view_modal" */}
																	<i className="flaticon-expand" />
																</Link>
															</li>
															<li>
																{wish_list.includes(item.id) ? <Popconfirm
																	title="Are you sure to delete this task?"
																	onConfirm={()=>removeWishlist(item.id)}
																	// onCancel={()=>removeWishlist(item.id)}
																	okText="Yes"
																	cancelText="No"
																>
																	<a
																		href="#"
																		title="Wishlist"
																	>
																		<i
																			className="flaticon-heart-1" style={{ color: "red" }}
																		/>
																	</a>
																</Popconfirm>
																	:
																	<a
																		href="#"
																		title="Wishlist"
																	>
																		<i
																			className="flaticon-heart-1"
																			onClick={() =>
																				AddWishlist(item.id)
																			}
																		/>
																	</a>}
															</li>
															{/* data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal" */}
															{/* <li>
																<span className="go-top">
																	<Link to={`/`} title="Product Details">
																		<i className="flaticon-add" />
																	</Link>
																</span>
															</li> */}
														</ul>
													</div>
												</div>
											</div>
										</div>
									)
								})}
							</Slider>
						</div>

         
          </div>
        </div>
      </div>

      <div className="ltn__modal-area ltn__add-to-cart-modal-area">
        <div className="modal fade" id="liton_wishlist_modal" tabIndex={-1}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-12">
                        <div className="modal-product-img">
                          <img
                            src={publicUrl + "assets/img/product/7.png"}
                            alt="#"
                          />
                        </div>
                        <div className="modal-product-info go-top">
                          <h5>
                            <Link to="/product-details">
                              Brake Conversion Kit
                            </Link>
                          </h5>
                          <p className="added-cart">
                            <i className="fa fa-check-circle" /> Successfully
                            added to your Wishlist
                          </p>
                          <div className="btn-wrapper">
                            <Link
                              to="/wishlist"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              View Wishlist
                            </Link>
                          </div>
                        </div>
                        {/* additional-info */}
                        <div className="additional-info d-none">
                          <p>
                            We want to give you <b>10% discount</b> for your
                            first order, <br /> Use discount code at checkout
                          </p>
                          <div className="payment-method">
                            <img
                              src={publicUrl + "assets/img/icons/payment.png"}
                              alt="#"
                            />
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

      <div className="ltn__modal-area ltn__quick-view-modal-area">
        <div className="modal fade" id="quick_view_modal" tabIndex={-1}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
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
                          <img
                            src={publicUrl + "assets/img/product/4.png"}
                            alt="#"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="modal-product-info">
                          <div className="product-ratting">
                            <ul>
                              <li>
                                <a href="#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fas fa-star-half-alt" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="far fa-star" />
                                </a>
                              </li>
                              <li className="review-total">
                                {" "}
                                <a href="#"> ( 95 Reviews )</a>
                              </li>
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
                                  <input
                                    type="text"
                                    defaultValue="02"
                                    name="qtybutton"
                                    className="cart-plus-minus-box"
                                  />
                                </div>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="theme-btn-1 btn btn-effect-1"
                                  title="Add to Cart"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_to_cart_modal"
                                >
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
                              <li>
                                <a href="#" title="Facebook">
                                  <i className="fab fa-facebook-f" />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="Twitter">
                                  <i className="fab fa-twitter" />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="Linkedin">
                                  <i className="fab fa-linkedin" />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="Instagram">
                                  <i className="fab fa-instagram" />
                                </a>
                              </li>
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

      <div className="ltn__modal-area ltn__add-to-cart-modal-area">
        <div className="modal fade" id="add_to_cart_modal" tabIndex={-1}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-12">
                        <div className="modal-product-img">
                          <img
                            src={publicUrl + "assets/img/product/1.png"}
                            alt="#"
                          />
                        </div>
                        <div className="modal-product-info go-top">
                          <h5 className="go-top">
                            <Link to="/product-details">
                              Brake Conversion Kit
                            </Link>
                          </h5>
                          <p className="added-cart">
                            <i className="fa fa-check-circle" />
                            Successfully added to your Cart
                          </p>
                          <div className="btn-wrapper">
                            <Link
                              to="/cart"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              View Cart
                            </Link>
                            <Link
                              to="/checkout"
                              className="theme-btn-2 btn btn-effect-2"
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                        {/* additional-info */}
                        <div className="additional-info d-none">
                          <p>
                            We want to give you <b>10% discount</b> for your
                            first order, <br /> Use discount code at checkout
                          </p>
                          <div className="payment-method">
                            <img
                              src={publicUrl + "assets/img/icons/payment.png"}
                              alt="#"
                            />
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
  );
};

export default ProductSliderV4;
