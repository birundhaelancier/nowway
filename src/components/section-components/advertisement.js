import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Advertisement extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL + '/'

        return <div>
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
                    <div className="row ltn__product-slider-item-three-active slick-arrow-1">
                        {/* ltn__product-item */}
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="ltn__product-item ltn__product-item-4 text-center---">
                                <div className="product-img go-top">
                                    <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
                                </div>
                            </div>
                        </div>
                        {/* ltn__product-item */}
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="ltn__product-item ltn__product-item-4 text-center---">
                                <div className="product-img go-top">
                                    <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/2.jpg"} alt="#" /></Link>
                                </div>
                            </div>
                        </div>
                        {/* ltn__product-item */}
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="ltn__product-item ltn__product-item-4 text-center---">
                                <div className="product-img go-top">
                                    <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/3.jpg"} alt="#" /></Link>
                                </div>
                            </div>
                        </div>
                        {/* ltn__product-item */}
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="ltn__product-item ltn__product-item-4 text-center---">
                                <div className="product-img go-top">
                                    <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/4.jpg"} alt="#" /></Link>
                                </div>
                            </div>
                        </div>
                        {/* ltn__product-item */}
                        <div className="col-xl-4 col-sm-6 col-12">
                            <div className="ltn__product-item ltn__product-item-4 text-center---">
                                <div className="product-img go-top">
                                    <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/5.jpg"} alt="#" /></Link>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Advertisement;