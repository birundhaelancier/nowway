import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

const ProductSliderV1 = ({ProductInfo}) => {
	let publicUrl = process.env.PUBLIC_URL + '/'
    const [slideNumber, setSlideNumber] = useState(3)
    const [ImageSlider,setImageSlider]=useState([])
	var settings = {
		dots: false,
		infinite: false,
		arrows:true,
		speed: 500,
		slidesToShow:ImageSlider.length>=3?3:1,
		slidesToScroll:ImageSlider.length>=3?3:1,
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
		ProductInfo && ProductInfo.map((data)=>{
			setImageSlider(data.image)
		})
	},[ProductInfo])
	return (
		<div className="ltn__img-slider-area">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12 product-slider-container" style={{margin:"15px 0px"}}>

						
						<Slider {...settings}>
							{ImageSlider.map((data, index) => {
								return (
									<div className="col-lg-12">
										<div className="ltn__img-slide-item-4">
											<a href={data} data-rel="lightcase:myCollection">
												<img src={data} alt="Image" style={{height:"270px",width:"100%",objectFit:"cover"}}/>
											</a>
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


export default ProductSliderV1

