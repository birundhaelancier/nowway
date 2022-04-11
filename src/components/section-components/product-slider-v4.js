import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Slider from "react-slick";
import { notification, Popconfirm } from 'antd'
import { Add_WishList, GetWishlist, RemoveWishlist } from '../apiActions'
import Swal from "sweetalert2";
import MediaComp from '../section-components/Loading'
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
          Swal.fire({
						title: 'Success!',
						icon: 'success',
						text: 'Wishlist Added Successfully',
					})
          callWish("success")
          setTimeout(() => {
            window.location.reload();
          }, 2000)
        } else {
          Swal.fire({
						title: 'Failed!',
						icon: 'error',
						text:"Something went wrong not added in your wishlist",
					})
        }
      })
    }
    else {
      GoTOLogin()
    }
  }
  const GoTOLogin=()=>{
    history.push({pathname:"/login"})

  }
  const removeWishlist = (id) => {
    RemoveWishlist(id).then((data) => {
      if (data.Status == "Success") {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Removed Successfully',
          timer: 4000,
          showConfirmButton: false,
        })
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      } else {
        Swal.fire({
          title: 'Failed!',
          icon: 'error',
          text:data.Message,
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
        {list.length>0 ?
          <div className="row">
            <div className="col-lg-12 product-slider-container">
              { }
              <Slider {...settings} arrows={true}>
                {list?.map((item, index) => {
                  return (
                    <div className="col-xl-4 col-sm-6 col-12">
                      <div className="ltn__product-item ltn__product-item-4 text-center---">
                        <div className="product-img go-top">
                          <Link to={`/product-details?product_id=${item.id}`}><img src={item.image[0]?item.image[0]:publicUrl+"assets/img/product-3/1.jpg"}/></Link>
                          <div className="product-badge">
                            <ul>
                              <li className={item.type === "Rent" ? "sale-badge bg-green" : "sale-badge bg-pink"}>{item.type === "Rent" ? "For Rent" : "For Sell"}</li>
                            </ul>
                          </div>
                          <div className="product-img-location-gallery">
                            <div className="product-img-location">
                              <ul>
                                <li>
                                  <Link to={`/product-details?product_id=${item.id}`}><i className="flaticon-pin" /> {item.city}</Link>
                                </li>
                              </ul>
                            </div>
                            <div className="product-img-gallery go-top">
                              <ul>
                                <li>
                                  <Link to={`/product-details?product_id=${item.id}`}><i className="fas fa-camera" /></Link>
                                </li>
                                {/* <li>
                                  <Link to={`/product-details?product_id=${item.id}`}><i className="fas fa-film" /> 2</Link>
                                </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="product-info">
                          <div className="product-price">
                          <Link to={`/product-details?product_id=${item.id}`}>₹{item.price}<label>/Month</label></Link>
                          </div>
                          <h2 className="product-title go-top"><Link to={`/product-details?product_id=${item.id}`}>{item.tit}</Link></h2>
                          <div className="product-description">
                            <p>{item.description}</p>
                          </div>
                          <Link to={`/product-details?product_id=${item.id}`}>
                          <ul className="ltn__list-item-2 ltn__list-item-2-before">
                            {/* <li><span>{item.bedrooms} <i className="flaticon-bed" /></span>
                              Bedrooms
                            </li> */}
                            <li><span>{item.bathroom} <i className="flaticon-clean" /></span>
                              Bathrooms
                            </li>
                            <li><span>{item.sq_ft} <i className="flaticon-square-shape-design-interface-tool-symbol" /></span>
                              square Ft
                            </li>
                          </ul>
                          </Link>
                        </div>
                        <div className="product-info-bottom">
                          <div className="real-estate-agent">
                            <div className="agent-img go-top">
                              <Link to={`/product-details?product_id=${item.id}`}><img src={item?.user_image || publicUrl + "assets/img/blog/author.jpg"} alt="#" style={{ width: "40px", height: "40px" }} /></Link>
                            </div>
                            <div className="agent-brief go-top">
                              <Link to={`/product-details?product_id=${item.id}`}><h6>{item.user_name}</h6></Link>
                            </div>
                          </div>
                          <div className="product-hover-action">
                            <ul>
                              <li>
                                <Link to={`/product-details?product_id=${item.id}`} title="Quick View">

                                  <i className="flaticon-expand" />
                                </Link>
                              </li>
                              <li>
                                {wish_list.includes(item.id) ? <Popconfirm
                                  title="Are you sure to delete this task?"
                                  onConfirm={() => removeWishlist(item.id)}
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
                                  <Link to={JSON.parse(localStorage.getItem("user_id"))?null:"/login"}><a
                                    href="#"
                                    title="Wishlist"
                                  >
                                    <i
                                      className="flaticon-heart-1"
                                      onClick={() =>
                                        AddWishlist(item.id)
                                      }
                                    />
                                  </a>
                                  </Link>
                                  }
                              </li>

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
          :
          <div className="row">
            {[...Array(3)].map((data) => {
                         return (
                 <div className="col-lg-4 col-sm-6 col-12">
                    <MediaComp/>
                 </div>
                 )})}
            </div>
            }
        </div>
      </div>
    </div>
  );
};

export default ProductSliderV4;
