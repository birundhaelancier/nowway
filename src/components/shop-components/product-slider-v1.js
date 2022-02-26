import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Slider from "react-slick";

const ProductSliderV1 = () => {
	let publicUrl = process.env.PUBLIC_URL + '/'
    const [slideNumber, setSlideNumber] = useState(3)

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
	return (
		<div className="ltn__img-slider-area">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12 product-slider-container">
						<Slider {...settings}>
							{["A", "B", "c", "d", "r"].map((data, index) => {
								return (
									<div className="col-lg-12">
										<div className="ltn__img-slide-item-4">
											<a href={publicUrl + `assets/img/img-slide/3${index + 1}.jpg`} data-rel="lightcase:myCollection">
												<img src={publicUrl + `assets/img/img-slide/3${index + 1}.jpg`} alt="Image" />
											</a>
										</div>
									</div>
								)
							})}
						</Slider>
					</div>

					{/* <div className="col-lg-12">
						<div className="ltn__img-slide-item-4">
							<a href={publicUrl + "assets/img/img-slide/31.jpg"} data-rel="lightcase:myCollection">
								<img src={publicUrl + "assets/img/img-slide/31.jpg"} alt="Image" />
							</a>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="ltn__img-slide-item-4">
							<a href={publicUrl + "assets/img/img-slide/32.jpg"} data-rel="lightcase:myCollection">
								<img src={publicUrl + "assets/img/img-slide/32.jpg"} alt="Image" />
							</a>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="ltn__img-slide-item-4">
							<a href={publicUrl + "assets/img/img-slide/33.jpg"} data-rel="lightcase:myCollection">
								<img src={publicUrl + "assets/img/img-slide/33.jpg"} alt="Image" />
							</a>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="ltn__img-slide-item-4">
							<a href={publicUrl + "assets/img/img-slide/34.jpg"} data-rel="lightcase:myCollection">
								<img src={publicUrl + "assets/img/img-slide/34.jpg"} alt="Image" />
							</a>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="ltn__img-slide-item-4">
							<a href={publicUrl + "assets/img/img-slide/35.jpg"} data-rel="lightcase:myCollection">
								<img src={publicUrl + "assets/img/img-slide/35.jpg"} alt="Image" />
							</a>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	)
}


export default ProductSliderV1