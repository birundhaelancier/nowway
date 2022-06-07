import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
import parse from "html-react-parser";
import Modal from "../Model";
import {
  Add_ContactDetails,
  Add_WishList,
  GetUserDetails,
  GetWishlist,
  GetContachDetails,
  RemoveWishlist,
  GetProductDetails,
  PropertyReportIssue
} from "../apiActions";
import { DatePicker, notification, TimePicker,Popconfirm  } from "antd";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { data } from "jquery";
const ShopDetails = ({ ProductInfo, RelatedProducts, TopCategory }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visitOpen, setvisitOpen] = useState(false);
  const [pro_details, setPro_details] = useState();
  const [profileDetails, setprofileDetails] = useState([]);
  const [Wish_list,setWish_list]=useState([])
  const [Contact_list,setContact_list]=useState([])
  const [contact,setcontact]=useState(false)
  const [enable,setenable]=useState(false)
  let history = useHistory();
  useEffect(() => {
    setPro_details(ProductInfo);
  }, [ProductInfo]);
  let publicUrl = process.env.PUBLIC_URL + "/";
  const AddContact = (id,limit,contact) => {
    if (JSON.parse(localStorage.getItem("user_id"))) {
      if(limit>=contact){
        Add_ContactDetails(id).then((res) => {
          if (res.Status === "Success") {
            setIsModalVisible(false);
            Swal.fire({
              title: 'Success!',
              icon: 'success',
              text: "Successfully added",
            })
        window.location.reload()
          }
        });
      }else{
        Swal.fire({
          title: 'Warning!',
          icon: 'warning',
          text: "Maximum limit reached today",
        })
      }
     
    } else {
      history.push("/login");
    }
  };
  const AddWishlist = (id) => {
    if (JSON.parse(localStorage.getItem("user_id"))) {
      Add_WishList(id).then((res) => {
        if (res.Status === "Success") {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: "Wishlist Added Successfully",
            timer: 4000,
            showConfirmButton: false,
          })
          setTimeout(()=>{
            window.location.reload();
          },2000)
        } else {
          Swal.fire({
            title: 'Failed!',
            icon: 'error',
            text: "Something went wrong not added in your wishlist",
          })
        }
      });
    } else {
      history.push("/login");
    }
  };
  useEffect(() => {
    GetUserDetails().then((data) => {
      setprofileDetails(data.Response);
    });
	GetWishlist().then((response) => {
		let arrVal = []
		response.Response.forEach((data) => {
			arrVal.push(data.id)
		})
		setWish_list(arrVal)
	})
	GetContachDetails().then((response) => {
		let arrVal = []
		response.Response.forEach((data) => {
			arrVal.push(data.id)
		})
		setContact_list(arrVal)

	})
  }, []);
 
  const removeWishlist = (id) => {
	RemoveWishlist(id).then((data) => {
		if (data.Status == "Success") {
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        text: "Removed Successfully",
        timer: 4000,
        showConfirmButton: false,
      })
      setTimeout(()=>{
        window.location.reload();
      },2000)
		} else {
      Swal.fire({
        title: 'Failed!',
        icon: 'error',
        text:data.Message,
      })
		}
	})
}



useEffect(()=>{
	Contact_list.filter((data)=>{
		if(data.id===pro_details?.find(item=>item.id)){
			setcontact(false)
		}
		else{
			setcontact(true)
		}
	})
},[Wish_list,Contact_list])

const GetContact=(id)=>{
  if(JSON.parse(localStorage.getItem("user_id"))){
    if(Contact_list.includes(id)){
      setIsModalVisible(false)
    }else{setIsModalVisible(true)}
  }else{
     history.push("/login")
  }
}
const GoToProduct=(Product_id)=>{
GetProductDetails(Product_id).then((data) => {
  setPro_details(data.Response)
  history.push({pathname:`/product-details?product_id=${Product_id}`})
  window.location.reload()
})
}
const PropertyIssue=(id,value,report)=>{
  if(JSON.parse(localStorage.getItem("user_id"))){
    if(report!==""){
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        text: "Already Reported",
      })
    }else{
  PropertyReportIssue(id,value).then((data)=>{
    if (data.Status == "Success") {
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        text: data.Message,
      })
      setTimeout(()=>{
         window.location.reload()
      },2000)
		} else {
      Swal.fire({
        title: 'Failed!',
        icon: 'error',
        text:data.Message,
      })
		}
  })
}
}else{
  history.push('/login')
}
}
  return (
    <div className="ltn__shop-details-area pb-10">
      <div className="container">
        {pro_details?.map((data) => {
          console.log(data,"dddddd")
          return (
            <>
              <div className="row">
                <div className={`col-lg-${Number(JSON.parse(localStorage.getItem("user_id")))===Number(data.user_id)?12:7} col-md-12`}>
                  <div className="ltn__shop-details-inner ltn__page-details-inner">
                    <div className="ltn__blog-meta">

                      <ul>
                        <li className="ltn__blog-category">
                          <Link className="bg-orange" to="#">
                            {data.typey}
                          </Link>
                        </li>
                        <li className="ltn__blog-date">
                          <i className="far fa-calendar-alt" />
                          {moment(data.d_date).format("DD-MM-YYYY")}
                        </li>
                      </ul>
                    </div>
                    {/* <h1>{data.title}</h1> */}
                    <label>
                      <span className="ltn__secondary-color">
                        <i className="flaticon-pin" />
                      </span>
                      {data.city}
                    </label>
                    <h4 className="title-2">Description</h4>
                    <p>{data.description}</p>
                  </div>
                </div>
                {Number(JSON.parse(localStorage.getItem("user_id")))===Number(data.user_id)?null:<div className="col-lg-5">
                  <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
                    <div className="widget ltn__menu-widget ltn__menu-widget-2--- ltn__menu-widget-2-color-2---">
                      <h4 className="ltn__widget-title ltn__widget-title-border-2">
                        Owner Details
                      </h4>
                      <div className="btn-icon-container">
                        <div className="div1">
                          <div className="ltn__blog-categorys">
                            <button
                              onClick={()=>GetContact(data.id)}
                              className="postBtn"
                            >
                               {Contact_list.includes(data.id)?"Contacted":JSON.parse(localStorage.getItem("user_id"))?"Get Owner Details":"SIGN IN (Get Owner Details)"}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="property-box">
                        <div className="circle-icon">
                          <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div>
                          <div className="propertyTitle">
                            Report what was not correct in this property
                          </div>
                          <div className="property_btn">
                            <div className={data.report===1?"Change_btn":"ltn_list"}>
                              <a onClick={()=>PropertyIssue(data.id,"Listed by Broker",data.report_issue)}>Listed by Broker</a>
                            </div>
                            <div className={data.report===2?"Change_btn":"ltn_list"}>
                              <a onClick={()=>PropertyIssue(data.id,"Sold Out",data.report_issue)}>Sold Out</a>
                            </div>
                            <div className={data.report===3?"Change_btn":"ltn_list"}>
                              <a onClick={()=>PropertyIssue(data.id,"Wrong Info",data.report_issue)}>Wrong Info</a>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </aside>
                </div>
         }
              </div>

         {/* get owner details end */}
                <Modal
                  show={isModalVisible}
                  modelTitle={"Owner Contact Details"}
                  width={700}
                  handleClose={() => setIsModalVisible(false)}
                >
               
                  <div className="ltn__quick-view-modal-inner">
                  
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 custom-model">
                          <div className="phone-info">
                          Thank you for your interest. Owner contact will be send shortly<br/>
                          For Support contact:+91 8248699623<br/>
                          For mail : contact@nowway.in<br/>
                          Please visit : <a href={"https://nowway.in"}>http://nowway.in</a><br/>
                          Download our app in playstore :<a href={"https://cutt.ly/XF4rplE"}>http://cutt.ly/XF4rplE</a>
                            {/* {profileDetails[0]?.mobile} */}
                          </div>
                          {/* <div className="phone-mail">
                            and {profileDetails[0]?.email}
                          </div> */}
                          <div className="owner-btn-show">
                            {Contact_list.includes(data.id)?
							        <button className="messegeBtn"  >
					          		Contacted
						         </button>:
						        	<button
                              className="messegeBtn"
                              onClick={() => AddContact(data.id,data.contact_limit,data.contacted)}
                            >
                             Got it
                            </button>}
                            {/* <button
                              className="propertyBtn"
                              onClick={() => {
                                setvisitOpen(true);
                                setIsModalVisible(false);
                              }}
                            >
                              Shedule Property Visit
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>

                <Modal
                  show={visitOpen}
                  width={35}
                  handleClose={() => setvisitOpen(false)}
                >
                  <div className="ltn__quick-view-modal-inner">
                    <div className="col-lg-12 text-center modalHeading">
                      Book a House Visit
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 custom-model visitmodal">
                          <div>
                            <DatePicker />
                          </div>
                          <div>
                            <TimePicker format="h:mm:ss A" />
                          </div>
                          <div className="owner-btn-show">
                            <button className="propertyBtn">Book Slot</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>

              <div className="row">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-7 col-md-12">
                      <div className="ltn__shop-details-inner ltn__page-details-inner">
                        <h4 className="title-2">Property Detail</h4>
                        <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                          <ul>
                            <li>
                              <label>Property ID:</label>{" "}
                              <span>{data.code}</span>
                            </li>
                            <li>
                              <label>Floors: </label> <span>{data.floors}</span>
                            </li>
                            <li>
                              <label>Negotiable:</label> <span>{data.negotiate}</span>
                            </li>
                            <li>
                              <label>Baths:</label> <span>{data.bathroom}</span>
                            </li>
                            <li>
                              <label>Parking:</label>{" "}
                              <span>{data.parking}</span>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <label>Availability:</label>{" "}
                              <span>{data.availability}</span>
                            </li>
                            <li>
                              <label>Carpet Area:</label>{" "}
                              <span>{data.sq_ft} sqft</span>
                            </li>
                            <li>
                              <label>Tenants:</label> <span>{data.tenants}</span>
                            </li>
                            <li>
                              <label>Price:</label> <span>{data.price}</span>
                            </li>
                            <li>
                              <label>Furnishing:</label>{" "}
                              <span>{data.furnishing}</span>
                            </li>
                          </ul>
                        </div>

                        <h4 className="title-2 mb-10">Amenities</h4>
                        <div className="property-details-amenities mb-60">
                          <div className="row">
                            <div className="col-lg-4 col-md-6">
                              <div className="ltn__menu-widget">
                                <ul>
                                  {data.amenities.split(",").map((o) => (
                                    <li>
                                      <label className="checkbox-item">
                                        {o}
                                        <input
                                          type="checkbox"
                                          defaultChecked="checked"
                                        />
                                        <span className="checkmark" />
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__shop-details-tab-content-inner--- ltn__shop-details-tab-inner-2 ltn__product-details-review-inner mb-60"></div>
                        {RelatedProducts?.length>0&&<h4 className="title-2">Related Properties</h4>}
                        <div className="row">
                          {/* ltn__product-item */}
                          {RelatedProducts &&
                            RelatedProducts.map((item) => (
                              <div className="col-xl-6 col-sm-6 col-12 go-top" key={item.id}>
                                <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                                  <div className="product-img">
                                    {/* {item.image.length>0?item?.image.map((img)=> */}
                                    <a  onClick={()=>GoToProduct(item.id)}>
                                      <img
                                        src={
                                          item?.image[0] || publicUrl +
                                          "assets/img/home.jpeg"
                                        }
                                        alt="#"
										                    style={{width:"100%",height:"300px",objectFit:"cover"}}
                                      />
                                    </a>
                                    {/* ):
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/product-3/1.jpg"
                                        }
                                        alt="#"
										                    style={{width:"100%",height:"300px",objectFit:"cover"}}
                                      />
                                   } */}
                                    <div className="real-estate-agent">
                                      <div className="agent-img">
                                        <a onClick={()=>GoToProduct(item.id)}> 
                                          <img
                                            src={
												                      item?.user_image || publicUrl +
                                              "assets/img/blog/author.jpg"
                                            }
                                            style={{width:"50px",height:"50px"}}

                                            alt="#"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-info">
                                    <div className="product-badge">
                                      <ul>
                                        <li className="sale-badg">
                                          {item.type === "Rent"
                                            ? "For Rent"
                                            : "For Sale"}
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="related_list">
                                    <h2 className="product-title" style={{marginTop:"10px"}}>
                                      <Link to={`/product-details?product_id=${item.id}`}>
                                        {item.bhk_type},{item.property_type}
                                        </Link>
                                    </h2>
                                    </div>
                                    <div className="product-img-location">
                                      <ul>
                                        <li>
                                          <Link to={`/product-details?product_id=${item.id}`}>
                                            <i className="flaticon-pin" />{" "}
                                            {item.address} , {item.city}
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                    <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                      {/* <li>
                                        <span>{item.bedrooms} </span>
                                        Bedrooms
                                      </li> */}
                                      <li>
                                        <span>{item.bathroom || 0} </span>
                                        Bathrooms
                                      </li>
                                      <li>
                                        <span>{item.sq_ft} </span>
                                        square Ft
                                      </li>
                                    </ul>
                                    <div className="product-hover-action" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                    <div className="product-price">
                                      <span>
                                        ₹{item.price}
                                        <label>/Month</label>
                                      </span>
                                    </div>
                                      <ul>
                                        <li>
                                          <a
                                            href="#"
                                            title="Quick View"
                                            data-bs-toggle="modal"
                                            data-bs-target="#quick_view_modal"
                                            onClick={()=>GoToProduct(item.id)}
                                          >
                                            <i className="flaticon-expand" />
                                          </a>
                                        </li>
                                     
                                        
                                        <li>
											
									                  	{Wish_list.includes(item.id) ?<Popconfirm
                                          title="Are you sure to delete this task?"
                                          onConfirm={()=>removeWishlist(item.id)}
                                          onCancel={""}
                                          okText="Yes"
                                          cancelText="No"
                                        >

                                          <a
                                            title="Wishlist"
                                            data-bs-toggle="modal"
                                            data-bs-target="#liton_wishlist_modal"
                                          >
                                            <i
                                              className="flaticon-heart-1" style={{color:"red"}}
                                            />
                                          </a>
										  </Popconfirm>:
										    <a
											  href="#"
											  title="Wishlist"
											  data-bs-toggle="modal"
											  data-bs-target="#liton_wishlist_modal"
											>
											  <i
												className="flaticon-heart-1"
												onClick={() =>
												  AddWishlist(item.id)
												}
											  />
											</a>}
                                        </li>
                                        {/* <li>
                                          <Link to="/#" title="Compare">
                                            <i className="flaticon-add" />
                                          </Link>
                                        </li> */}
                                        
                                      </ul>
                                     
                                    </div>
                                  </div>
                                  {/* <div className="product-info-bottom">
                                    
                                  </div> */}
                                </div>
                              </div>
                            ))}
                          {/* ltn__product-item */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
                        {/* Author Widget */}
                        <div className="widget ltn__author-widget">
                          <div className="ltn__author-widget-inner text-center">
                            <img
                              src={data?.user_image || publicUrl + "assets/img/team/4.jpg"}
                              alt="Image"
                              style={{width:"90px",height:"90px"}}
                            />
                            <h5>{data.user_name}</h5>
                            <small>{data.user_profession}</small>
                            <p>
                             {data.user_description}
                            </p>
                          </div>
                        </div>

                        {/* Menu Widget (Category) */}

                        <div className="widget ltn__tagcloud-widget go-top">
                          <h4 className="ltn__widget-title ltn__widget-title-border-2">
                            Top Categories
                          </h4>
                          <ul className="go-top">
                            {TopCategory.map((data) => (
                              <li>
                                <Link to={`/shop-right-sidebar/${data.name}`}>
                                  {data.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tagcloud Widget */}
                        {/* <div className="widget ltn__tagcloud-widget go-top">
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
												</div> */}
                        {/* Banner Widget */}
                        <div className="widget ltn__banner-widget d-none go-top">
                          <Link to="/#">
                            <img
                              src={publicUrl + "assets/img/banner/2.jpg"}
                              alt="#"
                            />
                          </Link>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default ShopDetails;
