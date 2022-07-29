import React, { Component,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { connect, useDispatch } from 'react-redux'
import { GetAmenities } from '../../Redux/Action/allActions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const CategoryV1 = ({ Aminities }) => {
	let dispatch=useDispatch()
	const [amenities_val, setAmenities_val] = useState([])
	useEffect(() => {
        // dispatch(GetHomeList())
        dispatch(GetAmenities())
	},[])
	useEffect(()=>{
		// setHome_list(props.HomeList)
		setAmenities_val(Aminities)
	},[Aminities])

	let settings = {
		arrows: false,
		dots: false,
		infinite: true,
		// speed: 1000,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
        autoplaySpeed: 1000,

		// initialSlide:1,
		// vertical:true,
		responsive: [{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			autoplay: true,
			autoplaySpeed: 1500,
			slidesToScroll: 2
		  }
	
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 2,
			autoplay: true,
			autoplaySpeed: 1500,
			slidesToScroll: 2
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			autoplay: true,
			autoplaySpeed: 1500,
			slidesToScroll: 2
		  }
		}
		]
	  };

	return (
		<div className="ltn__category-area ltn__product-gutter section-bg-1--- pt-115 pb-90 go-top">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title-area ltn__section-title-2--- text-center">
							<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Aminities</h6>
							<h1 className="section-title">Building Aminities</h1>
						</div>
					</div>
				</div>
				<div className="row ltn__category-slider-active--- slick-arrow-1 justify-content-center">
				<Slider {...settings} autoplay>
					{amenities_val?.map((item) => {
						return (
							<div className="col-lg-3 col-md-4 col-sm-6 col-6">
								<div className="ltn__category-item ltn__category-item-5 text-center ">
									<Link to="/#">
										<span className="category-icon">
											<img src={item.image} />
										</span>
										<span className="category-title">{item.name}</span>
										<span className="category-btn"><i className="flaticon-right-arrow" /></span>
									</Link>
								</div>
							</div>
						)
					})}
					</Slider>
					{/* <div className="col-lg-3 col-md-4 col-sm-6 col-6">
						<div className="ltn__category-item ltn__category-item-5 text-center">
							<Link to="/#">
								<span className="category-icon"><i className="flaticon-car" /></span>
								<span className="category-title">Parking Space</span>
								<span className="category-btn"><i className="flaticon-right-arrow" /></span>
							</Link>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-6 col-6">
						<div className="ltn__category-item ltn__category-item-5 text-center">
							<Link to="/#">
								<span className="category-icon"><i className="flaticon-swimming" /></span>
								<span className="category-title">Swimming Pool</span>
								<span className="category-btn"><i className="flaticon-right-arrow" /></span>
							</Link>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-6 col-6">
						<div className="ltn__category-item ltn__category-item-5 text-center">
							<Link to="/#">
								<span className="category-icon"><i className="flaticon-secure-shield" /></span>
								<span className="category-title">Private Security</span>
								<span className="category-btn"><i className="flaticon-right-arrow" /></span>
							</Link>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-6 col-6">
						<div className="ltn__category-item ltn__category-item-5 text-center">
							<Link to="/#">
								<span className="category-icon"><i className="flaticon-stethoscope" /></span>
								<span className="category-title">Medical Center</span>
								<span className="category-btn"><i className="flaticon-right-arrow" /></span>
							</Link>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-6 col-6">
						<div className="ltn__category-item ltn__category-item-5 text-center">
							<Link to="/#">
								<span className="category-icon"><i className="flaticon-book" /></span>
								<span className="category-title">Library Area</span>
								<span className="category-btn"><i className="flaticon-right-arrow" /></span>
							</Link>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-6 col-6">
						<div className="ltn__category-item ltn__category-item-5 text-center">
							<Link to="/#">
								<span className="category-icon"><i className="flaticon-bed-1" /></span>
								<span className="category-title">King Size Beds</span>
								<span className="category-btn"><i className="flaticon-right-arrow" /></span>
							</Link>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-6 col-6">
						<div className="ltn__category-item ltn__category-item-5 text-center">
							<Link to="/#">
								<span className="category-icon"><i className="flaticon-home-2" /></span>
								<span className="category-title">Smart Homes</span>
								<span className="category-btn"><i className="flaticon-right-arrow" /></span>
							</Link>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-6 col-6">
						<div className="ltn__category-item ltn__category-item-5 text-center">
							<Link to="/#">
								<span className="category-icon"><i className="flaticon<Slider" /></span>
								<span className="category-title">Kid’s Playland</span>
								<span className="category-btn"><i className="flaticon-right-arrow" /></span>
							</Link>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	)
}
const mapStateToProps = (state) =>
({
    // HomeList:state.AllReducer.HomeList.Response || [],
    Aminities:state.AllReducer.Aminities.Response || [],
});
export default connect(mapStateToProps)(CategoryV1);