import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class ImageOffer extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL + '/'

        return <div>
            <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title-area ltn__section-title-2--- text-center">
                                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Redeem your rewards</h6>
                                {/* <h1 className="section-title">Latest Listings</h1> */}
                            </div>
                        </div>
                    </div>
                    <div className="row ltn__custom-gutter--- justify-content-center go-top">
                        <div className='col-lg-12 row'>
                            <div className="col-lg-6 col-sm-6 col-12 mb-25">
                                <div className="product-img go-top">
                                    <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
                                    <div className="product-badge re-content">
                                        <button className='rm-btn'>Valid in all Cities</button>
                                        <div className='rm-offer'>Upto 25% off on Packers and movers</div>
                                        <div className='rm-cash'>Upto 1,000NBcash</div>
                                        <div className='rm-date'>Expires on :31st Dec 2022</div>
                                        <div className='Book-flow'>
                                            <button className='rmbook-btn'>Book Now</button>
                                            <div className='tc-condition'>T&C</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-6 col-sm-6 col-12 mb-25">
                                <div className="ltn__product-item ltn__product-item-4 text-center---">
                                    <div className="product-img go-top">
                                        <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
                                        <div className="product-badge re-content">
                                            <button className='rm-btn'>Valid in all Cities</button>
                                            <div className='rm-offer'>Upto 25% off on Packers and movers</div>
                                            <div className='rm-cash'>Upto 1,000NBcash</div>
                                            <div className='rm-date'>Expires on :31st Dec 2022</div>
                                            <div className='Book-flow'>
                                                <button className='rmbook-btn'>Book Now</button>
                                                <div className='tc-condition'>T&C</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-lg-6 col-sm-6 col-12 mb-25">
                                <div className="product-img go-top">
                                    <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
                                    <div className="product-badge re-content">
                                        <button className='rm-btn'>Valid in all Cities</button>
                                        <div className='rm-offer'>Upto 25% off on Packers and movers</div>
                                        <div className='rm-cash'>Upto 1,000NBcash</div>
                                        <div className='rm-date'>Expires on :31st Dec 2022</div>
                                        <div className='Book-flow'>
                                            <button className='rmbook-btn'>Book Now</button>
                                            <div className='tc-condition'>T&C</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-12 mb-25">
                                <div className="product-img go-top">
                                    <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
                                    <div className="product-badge re-content">
                                        <button className='rm-btn'>Valid in all Cities</button>
                                        <div className='rm-offer'>Upto 25% off on Packers and movers</div>
                                        <div className='rm-cash'>Upto 1,000NBcash</div>
                                        <div className='rm-date'>Expires on :31st Dec 2022</div>
                                        <div className='Book-flow'>
                                            <button className='rmbook-btn'>Book Now</button>
                                            <div className='tc-condition'>T&C</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="ltn__product-ite ltn__product-item-4 text-center---">
                                    <div className="product-img go-top">
                                        <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
                                        <div className="product-badge re-content">
                                            <button className='rm-btn'>Valid in all Cities</button>
                                            <div className='rm-offer'>Upto 25% off on Packers and movers</div>
                                            <div className='rm-cash'>Upto 1,000NBcash</div>
                                            <div className='rm-date'>Expires on :31st Dec 2022</div>
                                            <div className='Book-flow'>
                                                <button className='rmbook-btn'>Book Now</button>
                                                <div className='tc-condition'>T&C</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-6 col-sm-6 col-12">
                                <div className="ltn__product-item ltn__product-item-4 text-center---">
                                    <div className="product-img go-top">
                                        <Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
                                        <div className="product-badge re-content">
                                            <button className='rm-btn'>Valid in all Cities</button>
                                            <div className='rm-offer'>Upto 25% off on Packers and movers</div>
                                            <div className='rm-cash'>Upto 1,000NBcash</div>
                                            <div className='rm-date'>Expires on :31st Dec 2022</div>
                                            <div className='Book-flow'>
                                                <button className='rmbook-btn'>Book Now</button>
                                                <div className='tc-condition'>T&C</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default ImageOffer