import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { connect, useDispatch } from "react-redux";
import Sidebar from "./shop-sidebar";
import { useEffect } from "react";
import { notification,Popconfirm } from "antd";
import { GetPropertyType_Search } from "../../Redux/Action/allActions";
import { Add_WishList } from "../apiActions";
import {
  GetAmenities,
  GetPropertyType,
  GetWishlist
} from "../../components/apiActions/index";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const ShopGridV1 = (props) => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [Amenities, setAmenities] = useState([]);
  const [Search, setSearch] = useState("");
  const [Property_type, setProperty_type] = useState([]);
  const [Wish_list,setWish_list]=useState([])
  const [enable,setenable]=useState(false)
  useEffect(() => {
    //   dispatch(GetPropertyType_Search())
    GetAmenities().then((data) => {
      setAmenities(data.Response);
    });
    GetPropertyType().then((data) => {
      setProperty_type(data.Response);
    });
    GetWishlist().then((response) => {
      setWish_list(response.Response)
    })
  }, []);

  useEffect(() => {}, [props.Property_Detail]);
  useEffect(() => {
    if (Search !== "") {
      dispatch(GetPropertyType_Search("", "", Search)).then((data) => {});
    }
  }, [Search]);

  let publicUrl = process.env.PUBLIC_URL + "/";
  const AddWishlist = (id) => {
    if (JSON.parse(localStorage.getItem("user_id"))) {
      Add_WishList(id).then((res) => {
        if (res.Status === "Success") {
          notification.success({
            message: "Wishlist Added Successfully",
          });
        } else {
          notification.success({
            message: "Something went wrong not added in your wishlist",
          });
        }
      });
    } else {
      history.push("/login");
    }
  };
  useEffect(()=>{
    Wish_list.filter((data)=>{
      if(data.id===props.Property_Detail?.find(item=>item.id)){
        setenable(false)
      }
      else{
        setenable(true)
      }
    })
  },[Wish_list,props.Property_Detail])
  return (
    <div>
      <div className="ltn__product-area ltn__product-gutter">
        <div className="container">
          <div className="row wrap-reverse">
            <Sidebar
              Type={props.Type}
              Property_type={Property_type}
              Amenities={Amenities}
            />
            <div className="col-lg-8 ">
              <div className="ltn__shop-options">
                <ul className="justify-content-start">
                  {/* <li>
										<div className="ltn__grid-list-tab-menu ">
											<div className="nav">
												<a className="active show" data-bs-toggle="tab" href="#liton_product_grid"><i className="fas fa-th-large" /></a>
												<a data-bs-toggle="tab" href="#liton_product_list"><i className="fas fa-list" /></a> 
											</div>
										</div>
									</li> */}
                  <li className="d-none">
                    <div className="showing-product-number text-right">
                      <span>Showing 1–12 of 18 results</span>
                    </div>
                  </li>
                  <li></li>
                </ul>
              </div>
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="liton_product_grid"
                >
                  <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* Search Widget */}
                        <div className="ltn__search-widget mb-30">
                          <form action="#">
                            <input
                              type="text"
                              name="search"
                              onChange={(data) => setSearch(data.target.value)}
                              value={Search}
                              placeholder="Search your keyword..."
                            />
                            {/* <button type="submit"><i className="fas fa-search" /></button> */}
                          </form>
                        </div>
                      </div>
                      {/* ltn__product-item */}
                      {props.Property_Detail.length > 0 ? (
                        props.Property_Detail.map((data) => (
                          <div className="col-xl-6 col-sm-6 col-12" key={data.id}>
                            <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                              <div className="product-img go-top">
                                <Link to="/product-details">
                                  <img
                                    src={
                                      publicUrl + "assets/img/product-3/1.jpg"
                                    }
                                    alt="#"
                                  />
                                </Link>
                                <div className="real-estate-agent">
                                  <div className="agent-img">
                                    <Link to="/shop">
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/blog/author.jpg"
                                        }
                                        alt="#"
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="product-info">
                                <div className="product-badge">
                                  <ul>
                                    <li className="sale-badg">{data.type}</li>
                                  </ul>
                                </div>
                                <h2 className="product-title go-top">
                                  <Link to="/product-details">
                                    {data.title}
                                  </Link>
                                </h2>
                                <div className="product-img-location go-top">
                                  <ul>
                                    <li>
                                      <Link to="/contact">
                                        <i className="flaticon-pin" />{" "}
                                        {data.address} , {data.city}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                  <li>
                                    <span>{data.bedrooms || 0} </span>
                                    Bed
                                  </li>
                                  <li>
                                    <span>{data.bathroom || 0} </span>
                                    Bath
                                  </li>
                                  <li>
                                    <span>{data.size} </span>
                                    Square Ft
                                  </li>
                                </ul>
                                <div className="product-hover-action">
                                  <ul>
                                    <li>
                                      <a href="#" title="Quick View">
                                        <i className="flaticon-expand" />
                                      </a>
                                    </li>
                                    <li>
                                      {enable ? (
                                        <Popconfirm
                                          title="Are you sure to delete this task?"
                                          onConfirm={""}
                                          onCancel={""}
                                          okText="Yes"
                                          cancelText="No"
                                        >
                                          <a
                                            href="#"
                                            title="Wishlist"
                                            data-bs-toggle="modal"
                                            data-bs-target="#liton_wishlist_modal"
                                          >
                                            <i
                                              className="flaticon-heart-1"
                                              style={{ color: "red" }}
                                            />
                                          </a>
                                        </Popconfirm>
                                      ) : (
                                        <a
                                          href="#"
                                          title="Wishlist"
                                          data-bs-toggle="modal"
                                          data-bs-target="#liton_wishlist_modal"
                                        >
                                          <i
                                            className="flaticon-heart-1"
                                            onClick={() => AddWishlist(data.id)}
                                          />
                                        </a>
                                      )}
                                      {/* <a  title="Wishlist">
                                        <i className="flaticon-heart-1" onClick={()=>AddWishlist(data.id)}/>
                                      </a> */}
                                    </li>
                                    <li className="go-top">
                                      <Link
                                        to={`/product-details?product_id=${data.id}`}
                                        title="Product Details"
                                      >
                                        <i className="flaticon-add" />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="product-info-bottom">
                                <div className="product-price">
                                  <span>
                                    ₹{data.price}
                                    <label>/Month</label>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        // {/*  */}
                        <div className="ltn__404-area ltn__404-area-1 mb-120">
                          <div className="container">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="error-404-inner text-center">
                                  <div className="error-img mb-30">
                                    <img
                                      src={
                                        publicUrl +
                                        "assets/img/others/error-1.png"
                                      }
                                      alt="#"
                                    />
                                  </div>
                                  <h1 className="error-404-title d-none">
                                    404
                                  </h1>
                                  <h2>Data Not Found!</h2>
                                  {/* <h3>Oops! Looks like something going rong</h3> */}
                                  <p>
                                    Oops! The page you are looking for does not
                                    exist. It might have been moved or deleted.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="ltn__pagination-area text-center">
								<div className="ltn__pagination">
									<ul>
										<li><Link to="#"><i className="fas fa-angle-double-left" /></Link></li>
										<li><Link to="#">1</Link></li>
										<li className="active"><Link to="#">2</Link></li>
										<li><Link to="#">3</Link></li>
										<li><Link to="#">...</Link></li>
										<li><Link to="#">10</Link></li>
										<li><Link to="#"><i className="fas fa-angle-double-right" /></Link></li>
									</ul>
								</div>
							</div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="ltn__modal-area ltn__add-to-cart-modal-area">
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
      </div> */}

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

const mapStateToProps = (state) => ({
  Property_Detail: state.AllReducer.Property_list.Response || [],
});

export default connect(mapStateToProps)(ShopGridV1);
