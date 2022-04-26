import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Slider from "react-slick";
import MediaComp from '../section-components/Loading'
import MagicSliderDots from 'react-magic-slider-dots';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-magic-slider-dots/dist/magic-dots.css';
const Advertisement = ({ home_offers }) => {
    let publicUrl = process.env.PUBLIC_URL + '/'
    const [slideNumber, setSlideNumber] = useState(3)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slideNumber,
        slidesToScroll: 1,
        appendDots: (dots) => {
            return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={30} />
          },
        responsive: [
           {
            breakpoint: 480,
            settings: {
                arrows:false,
                dots:true
            }
          }
        ]
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
        <div>
            <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title-area ltn__section-title-2--- text-center">
                                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Offers</h6>

                                <h1 className="section-title">Latest Offers</h1>
                            </div>
                        </div>
                    </div>
                    {home_offers.length>0 ?
                    <div className="row">
                    <div className='col-lg-12 product-slider-container'>
                       <Slider {...settings}>
                                {home_offers?.map((item) => {
                                    return (
                                        <div className="col-xl-4 col-sm-6 col-12">
                                            <div className="ltn__product-item ltn__product-item-4 text-center---">
                                                <div className="product-img go-top">
                                                    <Link to="/#"><img src={item.image} alt="#" /></Link>
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
    )
}

export default Advertisement;