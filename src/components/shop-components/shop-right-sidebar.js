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
  GetWishlist,
  RemoveWishlist
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
      let arrVal = []
      response.Response.forEach((data) => {
        arrVal.push(data.id)
      })
      setWish_list(arrVal)
    })
  }, []);



  let publicUrl = process.env.PUBLIC_URL + "/";
  const AddWishlist = (id) => {
    if (JSON.parse(localStorage.getItem("user_id"))) {
      Add_WishList(id).then((res) => {
        if (res.Status === "Success") {
          notification.success({
            message: "Wishlist Added Successfully",
          });
          setTimeout(()=>{
            window.location.reload();
            },2000)
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

  const removeWishlist = (id) => {
    RemoveWishlist(id).then((data) => {
      if (data.Status === "Success") {
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
      <div className="ltn__product-area ltn__product-gutter">
        <div className="container">
          <div className="row wrap-reverse">
            <Sidebar
              Type={props.Type}
              Property_type={Property_type}
              Amenities={Amenities}
              Search={Search}
            />
            <div className="col-lg-8 ">
              <div className="ltn__shop-options">
                <ul className="justify-content-start">
             
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
                        <div className="ltn__search-widget desktop_view mb-30">
                          <form>
                            <input
                              type="text"
                              name="search"
                              onChange={(data) => setSearch(data.target.value)}
                              value={Search}
                              placeholder="Search your keyword..."
                            />
                            <button><i className="fas fa-search" /></button>
                          </form>
                        </div>
                      </div>
                      {/* ltn__product-item */}
                      {props.Property_Detail.length > 0 ? (
                        props.Property_Detail.map((data) => (
                          <div className="col-xl-6 col-sm-6 col-12" key={data.id}>
                            <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                              <div className="product-img go-top">
                                <Link to={`/product-details/${data.code}`}>
                                  <img
                                    src={
                                      data?.image[0] ||  publicUrl + "assets/img/home.jpeg" 
                                    }
                                    style={{width:"100%",height:"250px",objectFit:"cover"}}
                                    alt="#"
                                  />
                                </Link>
                                <div className="real-estate-agent">
                                  <div className="agent-img">
                                      <img
                                        src={
                                          data?.user_image ||   publicUrl +
                                          "assets/img/dummy-profile-pic.png"
                                        }
                                        alt="#"
                                        style={{width:"50px",height:"50px"}}
                                      />
                                  </div>

                                </div>
                              </div>
                              <div className="product-info">
                                <div className="product-badge">
                                  <ul>
                                    <li className="sale-badg">{data.type}</li>
                                  </ul>
                                </div>
                                <h2 className="product-title go-top" style={{marginTop:"10px"}}>
                                  <Link to={`/product-details/${data.code}`}>
                                    {data.bhk_type},{data.property_type}
                                  </Link>
                                </h2>
                                <div className="product-img-location related_list go-top">
                                  <ul>
                                    <li>
                                      <a>
                                        <i className="flaticon-pin" />{" "}
                                        {data.address} , {data.city}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                  {/* <li>
                                    <span>{data.bedrooms || 0} </span>
                                    Bed
                                  </li> */}
                                  <li>
                                    <span>{data.bathroom || 0} </span>
                                    Bath
                                  </li>
                                  <li>
                                    <span>{data.sq_ft} </span>
                                    Square Ft
                                  </li>
                                </ul>
                                <div className="product-hover-action" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="product-price">
                                  <span>
                                    ₹{data.price}
                                    <label>{data.type==="Rent" ? "/Month" : ""}</label>
                                  </span>
                                </div>
                                  <ul>
                                    <li>
                                      <Link to={`/product-details/${data.code}`}>
                                        <i className="flaticon-expand" />
                                      </Link>
                                    </li>
                                    <li>
                                      {Wish_list.includes(data.id) ? (
                                        <Popconfirm
                                          title="Are you sure to delete this task?"
                                          onConfirm={()=>removeWishlist(data.id)}
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
                                        <a  title="Wishlist">
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
                                    {/* <li className="go-top">
                                      <Link
                                        to={`/product-details?product_id=${data.id}`}
                                        title="Product Details"
                                      >
                                        <i className="flaticon-add" />
                                      </Link>
                                    </li> */}
                                  </ul>
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
                                      src={publicUrl + "assets/img/error.png"}
                                      alt="#"
                                    />
                                  </div>
                                  <h1 className="error-404-title d-none">
                                    
                                  </h1>
                                  <h2>No Data Found!</h2>
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

   


  
    </div>
  );
};

const mapStateToProps = (state) => ({
  Property_Detail: state.AllReducer.Property_list.Response || [],
});

export default connect(mapStateToProps)(ShopGridV1);
