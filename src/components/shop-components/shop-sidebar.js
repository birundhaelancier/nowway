import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox,notification } from 'antd'
import { GetPropertyType_Search } from '../../Redux/Action/allActions';
import { useDispatch,connect } from 'react-redux';
import {GetAmenities,GetPropertyType,GetBathroom } from '../../components/apiActions/index';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Sidebar=(props)=>{
		let anchor = '#'
		let imagealt = 'image'
		let publicUrl = process.env.PUBLIC_URL + '/'
		const { id } =useParams()
		const [Amenities,setAmenities]=useState([])
        const [Property_type,setProperty_type]=useState([])
		const [Bathroom_type,setBathroom_type]=useState([])

		let dispatch =useDispatch()
		const PriceRange=[{heading:"Low Price",from:5000,to:10000},{heading:"Medium",from:10000,to:30000},{heading:"High Price",from:30000,to:50000}]
		const Bed_Rooms=[{heading:"Single",label:"1"},{heading:"Double",label:"1 or more"},{heading:"Up To 3",label:"2 or more"},{heading:"Up To 5",label:"3 or more"}]
		const Category=[{heading:"Renting",label:"Rent"},{heading:"Selling / Buying",label:"Sell"}]
		const [CheckValues,setCheckValues]=useState({
			Amenities:"",
			property:[id || ""],
			PriceRange:"",
			Bed_Bath:"",
			Category:[props?.Type || "Rent"],
			Bathrooms:"",

		})
	
		const ChangeCheckbox=(e,name,price)=>{

			if(name==="PriceRange"){
			  let Pricerange={
				  from:price.from,
				  to:price.to
			  }
			  setCheckValues({
                ...CheckValues,
                [name]: Pricerange,
              });
			}
            else{
            let arrValues = []
            if (e.target.checked === true) {
                arrValues = [...CheckValues[name], String(e.target.value)]
            } else {
                const selectedAcc = CheckValues[name].filter(a => {
                    if (a === String(e.target.value)) return false;
                    return true;
                });
                arrValues = [...selectedAcc]
            }
            setCheckValues({
                ...CheckValues,
                [name]: arrValues,
            });
		  }
			// ApiActionCall(CheckValues)
		}

	useEffect(()=>{
			GetAmenities().then((data) => {
				setAmenities(data.Response)
			})
			GetPropertyType().then((data) => {
				setProperty_type(data.Response)
			})
			GetBathroom().then((data) => {
				setBathroom_type(data.Response)
			})
	  
	  },[])	


  useEffect(()=>{
	ApiActionCall(CheckValues)
  },[CheckValues])
 const ApiActionCall=(CheckValues)=>{
	dispatch(GetPropertyType_Search(CheckValues)).then((data) => {	
  })
 }

 console.log("hhhhhhh",id,CheckValues)
 console.log("dddd",props.Property_Detail)

		return (
			<div className="col-lg-4">
				<aside className="sidebar ltn__shop-sidebar">
					<h3 className="mb-10">Advance Information</h3>
					<label className="mb-30"><small>About 9,620 results (0.62 seconds) </small></label>
					{/* Advance Information widget */}
					<div className="widget ltn__menu-widget">
						<h4 className="ltn__widget-title">Property Type</h4>
						<ul>
					
							{Property_type.map((data,index)=>
							<li>
								<label className="checkbox-item">{data.name}
									<input type="checkbox" checked={CheckValues.property.lastIndexOf(String(data.name)) >= 0 ? true : false}  onChange={(e)=>ChangeCheckbox(e,  "property", data.id, index + 1)}  name={data.name} value={data.name} />
									<span className="checkmark" />
								</label>
								{/* <span className="categorey-no">3,924</span> */}
							</li>
							)}
							
						</ul>
						<hr />
						<h4 className="ltn__widget-title">Amenities</h4>
						<ul>
							{Amenities.map((data,index)=>
							<li>
							   <label className="checkbox-item">{data.name}
									<input type="checkbox" checked={CheckValues.Amenities.lastIndexOf(String(data.name)) >= 0 ? true : false}  onChange={(e)=>ChangeCheckbox(e,  "Amenities",index + 1)}  name={data.name} value={data.name} />
									<span className="checkmark" />
								</label>
								{/* <span className="categorey-no">3,924</span> */}
							</li>
							)}
						</ul>
						<hr />
						<h4 className="ltn__widget-title">Price Range</h4>
						<ul>
							{PriceRange.map((data,index)=>
							<li>
								<label className="checkbox-item">{data.heading}
									<input type="checkbox" checked={CheckValues.PriceRange.from===data.from?true:false} onChange={(e)=>ChangeCheckbox(e,  "PriceRange",data)}  name={data.heading} value={data.heading} />
									<span className="checkmark" />
								</label>
								<span className="categorey-no">₹{data.from} - ₹{data.to}</span>
							</li>
							)}
								{/* <span className="categorey-no">₹30,000 Up</span> */}
						</ul>
						<hr />
					
						<h4 className="ltn__widget-title">Bed Rooms</h4>
						<ul>
						{Bed_Rooms.map((data,index)=>
							<li>
								<label className="checkbox-item">{data.heading}
									<input type="checkbox" checked={CheckValues.Bed_Bath.lastIndexOf(String(data.label)) >= 0 ? true : false}  onChange={(e)=>ChangeCheckbox(e,  "Bed_Bath", data.id, index + 1)}  name={data.label} value={data.label} />
									<span className="checkmark" />
								</label>
								{/* <span className="categorey-no">3,924</span> */}
							</li>
						)}
						</ul>
						<hr />

						<h4 className="ltn__widget-title">Bath Rooms</h4>
						<ul>
						{Bathroom_type.map((data,index)=>
							<li>
								<label className="checkbox-item">{data.name}
									<input type="checkbox" checked={CheckValues.Bathrooms.lastIndexOf(String(data.name)) >= 0 ? true : false}  onChange={(e)=>ChangeCheckbox(e,  "Bathrooms", data.id, index + 1)}  name={data.name} value={data.name} />
									<span className="checkmark" />
								</label>
								{/* <span className="categorey-no">3,924</span> */}
							</li>
						)}
						</ul>
						<hr />
						{/* Price Filter Widget */}
						{/* <div className="widget--- ltn__price-filter-widget">
							<h4 className="ltn__widget-title ltn__widget-title-border---">Filter by price</h4>
							<div className="price_filter">
								<div className="price_slider_amount">
									<input type="submit" defaultValue="Your range:" />
									<input type="text" className="amount"  value={45678} name="price" placeholder="Add Your Price" />
								</div>
								<div className="slider-range" />
							</div>
						</div>
						<hr /> */}

						<h4 className="ltn__widget-title">Catagory</h4>
						<ul>
							
							{Category.map((data,index)=>
							<li>
								<label className="checkbox-item">{data.heading}
									<input type="checkbox" checked={CheckValues.Category.lastIndexOf(String(data.label)) >= 0 ? true : false}  onChange={(e)=>ChangeCheckbox(e,  "Category", data.id, index + 1)}  name={data.label} value={data.label} />
									<span className="checkmark" />
								</label>
								{/* <span className="categorey-no">3,924</span> */}
							</li>
						)}
						</ul>
					</div>
					{/* Category Widget */}
					<div className="widget ltn__menu-widget d-none">
						<h4 className="ltn__widget-title ltn__widget-title-border">Product categories</h4>
						<ul>
							<li><a href="#">Body <span><i className="fas fa-long-arrow-alt-right" /></span></a></li>
							<li><a href="#">Interior <span><i className="fas fa-long-arrow-alt-right" /></span></a></li>
							<li><a href="#">Lights <span><i className="fas fa-long-arrow-alt-right" /></span></a></li>
							<li><a href="#">Parts <span><i className="fas fa-long-arrow-alt-right" /></span></a></li>
							<li><a href="#">Tires <span><i className="fas fa-long-arrow-alt-right" /></span></a></li>
							<li><a href="#">Uncategorized <span><i className="fas fa-long-arrow-alt-right" /></span></a></li>
							<li><a href="#">Wheel <span><i className="fas fa-long-arrow-alt-right" /></span></a></li>
						</ul>
					</div>
					{/* Price Filter Widget */}
					<div className="widget ltn__price-filter-widget d-none">
						<h4 className="ltn__widget-title ltn__widget-title-border">Filter by price</h4>
						<div className="price_filter">
							<div className="price_slider_amount">
								<input type="submit" defaultValue="Your range:" />
								<input type="text" className="amount" name="price" placeholder="Add Your Price" />
							</div>
							<div className="slider-range" />
						</div>
					</div>
					{/* Top Rated Product Widget */}
					<div className="widget ltn__top-rated-product-widget d-none">
						<h4 className="ltn__widget-title ltn__widget-title-border">Top Rated Product</h4>
						<ul>
							<li>
								<div className="top-rated-product-item clearfix">
									<div className="top-rated-product-img">
										<a href="product-details.html"><img src="img/product/1.png" alt="#" /></a>
									</div>
									<div className="top-rated-product-info">
										<div className="product-ratting">
											<ul>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
											</ul>
										</div>
										<h6><a href="product-details.html">Mixel Solid Seat Cover</a></h6>
										<div className="product-price">
											<span>₹49.00</span>
											<del>₹65.00</del>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div className="top-rated-product-item clearfix">
									<div className="top-rated-product-img">
										<a href="product-details.html"><img src="img/product/2.png" alt="#" /></a>
									</div>
									<div className="top-rated-product-info">
										<div className="product-ratting">
											<ul>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
											</ul>
										</div>
										<h6><a href="product-details.html">Brake Conversion Kit</a></h6>
										<div className="product-price">
											<span>₹49.00</span>
											<del>₹65.00</del>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div className="top-rated-product-item clearfix">
									<div className="top-rated-product-img">
										<a href="product-details.html"><img src="img/product/3.png" alt="#" /></a>
									</div>
									<div className="top-rated-product-info">
										<div className="product-ratting">
											<ul>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star" /></a></li>
												<li><a href="#"><i className="fas fa-star-half-alt" /></a></li>
												<li><a href="#"><i className="far fa-star" /></a></li>
											</ul>
										</div>
										<h6><a href="product-details.html">Coil Spring Conversion</a></h6>
										<div className="product-price">
											<span>₹49.00</span>
											<del>₹65.00</del>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					{/* Search Widget */}
					<div className="widget ltn__search-widget d-none">
						<h4 className="ltn__widget-title ltn__widget-title-border">Search Objects</h4>
						<form action="#">
							<input type="text" name="search" placeholder="Search your keyword..." />
							<button type="submit"><i className="fas fa-search" /></button>
						</form>
					</div>
					{/* Tagcloud Widget */}
					<div className="widget ltn__tagcloud-widget d-none">
						<h4 className="ltn__widget-title ltn__widget-title-border">Popular Tags</h4>
						<ul>
							<li><a href="#">Popular</a></li>
							<li><a href="#">desgin</a></li>
							<li><a href="#">ux</a></li>
							<li><a href="#">usability</a></li>
							<li><a href="#">develop</a></li>
							<li><a href="#">icon</a></li>
							<li><a href="#">Car</a></li>
							<li><a href="#">Service</a></li>
							<li><a href="#">Repairs</a></li>
							<li><a href="#">Auto Parts</a></li>
							<li><a href="#">Oil</a></li>
							<li><a href="#">Dealer</a></li>
							<li><a href="#">Oil Change</a></li>
							<li><a href="#">Body Color</a></li>
						</ul>
					</div>
					{/* Size Widget */}
					<div className="widget ltn__tagcloud-widget ltn__size-widget d-none">
						<h4 className="ltn__widget-title ltn__widget-title-border">Product Size</h4>
						<ul>
							<li><a href="#">S</a></li>
							<li><a href="#">M</a></li>
							<li><a href="#">L</a></li>
							<li><a href="#">XL</a></li>
							<li><a href="#">XXL</a></li>
						</ul>
					</div>
					{/* Color Widget */}
					<div className="widget ltn__color-widget d-none">
						<h4 className="ltn__widget-title ltn__widget-title-border">Product Color</h4>
						<ul>
							<li className="black"><a href="#" /></li>
							<li className="white"><a href="#" /></li>
							<li className="red"><a href="#" /></li>
							<li className="silver"><a href="#" /></li>
							<li className="gray"><a href="#" /></li>
							<li className="maroon"><a href="#" /></li>
							<li className="yellow"><a href="#" /></li>
							<li className="olive"><a href="#" /></li>
							<li className="lime"><a href="#" /></li>
							<li className="green"><a href="#" /></li>
							<li className="aqua"><a href="#" /></li>
							<li className="teal"><a href="#" /></li>
							<li className="blue"><a href="#" /></li>
							<li className="navy"><a href="#" /></li>
							<li className="fuchsia"><a href="#" /></li>
							<li className="purple"><a href="#" /></li>
							<li className="pink"><a href="#" /></li>
							<li className="nude"><a href="#" /></li>
							<li className="orange"><a href="#" /></li>
							<li><a href="#" className="orange" /></li>
							<li><a href="#" className="orange" /></li>
						</ul>
					</div>
					{/* Banner Widget */}
					<div className="widget ltn__banner-widget d-none">
						<a href="shop.html"><img src="img/banner/banner-2.jpg" alt="#" /></a>
					</div>
				</aside>
			</div>
		)
	}


const mapStateToProps = (state) => ({
	Property_Detail: state.AllReducer.Property_list.Response || [],
});
 export default connect(mapStateToProps)(Sidebar);