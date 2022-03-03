import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Slider from "react-slick";
import { FeedBacklist } from '../apiActions'
import { data } from 'jquery';
const Testimonial = ({ home_offers }) => {
	let publicUrl = process.env.PUBLIC_URL + '/'
	const [feed_list,setFeed_list]=useState([])
	let imagealt = 'image';
	const [slideNumber, setSlideNumber] = useState(3)


	var settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: slideNumber,
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
	useEffect(()=>{
		FeedBacklist().then((res)=>{
			setFeed_list(res.Response)
		})
	},[])
	return (
		<div className="ltn__testimonial-area section-bg-1--- bg-image-top pt-115 pb-70" data-bs-bg={publicUrl + "assets/img/bg/20.jpg"}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
					{feed_list.length>0&&<div className="section-title-area ltn__section-title-2--- text-center">
							<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Testimonial</h6>
							<h1 className="section-title">Clients Feedback</h1>
						</div>}
					</div>
				</div>
				{/* <div className="row ltn__testimonial-slider-5-active slick-arrow-1"> */}
				<div className="row">
					<div className='col-lg-12 product-slider-container'>
						<Slider {...settings}>
							{feed_list.map((item) => {
								return (
									<div className="col-lg-4">
										<div className="ltn__testimonial-item ltn__testimonial-item-7">
											<div className="ltn__testimoni-info">
												<p><i className="flaticon-left-quote-1" />
												{item.feedback}
													</p>
												{/* <div className="ltn__testimoni-info-inner">
													<div className="ltn__testimoni-img">
														<img src={publicUrl + "assets/img/testimonial/1.jpg"} alt="#" />
													</div>
													<div className="ltn__testimoni-name-designation">
														<h5>Jacob William</h5>
														<label>Selling Agents</label>
													</div>
												</div> */}
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
	)
}

export default Testimonial