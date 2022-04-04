import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Item from 'antd/lib/list/Item';

const FaqV1 = ({ faq_details }) => {
    let publicUrl = process.env.PUBLIC_URL + '/';
    console.log(faq_details, "faq_details")
    return (
        <div className="ltn__faq-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="ltn__faq-inner ltn__faq-inner-2">
                            <div id="accordion_2">
                                {faq_details?.map((item, index) => {
                                    return (
                                        <div className="card">
                                            <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target={`#faq-item-2-${index + 1}`} aria-expanded="false">
                                                {item.question}
                                            </h6>
                                            <div id={`faq-item-2-${index + 1}`} className="collapse" data-bs-parent="#accordion_2">
                                                <div className="card-body">
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                {/* <div className="card">
                                    <h6 className="ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-2" aria-expanded="true">
                                        How can i make refund from your website?
                                    </h6>
                                    <div id="faq-item-2-2" className="collapse show" data-bs-parent="#accordion_2">
                                        <div className="card-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Proin libero nunc consequat interdum. Condimentum lacinia quis vel eros donec ac. Mauris sit amet massa vitae tortor. Quisque id diam vel quam elementum pulvinar. Gravida in fermentum et sollicitudin ac orci phasellus. Facilisis gravida neque convallis a cras semper. Non arcu risus quis varius quam quisque id.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-3" aria-expanded="false">
                                        I am a new user. How should I start?
                                    </h6>
                                    <div id="faq-item-2-3" className="collapse" data-bs-parent="#accordion_2">
                                        <div className="card-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Proin libero nunc consequat interdum. Condimentum lacinia quis vel eros donec ac. Mauris sit amet massa vitae tortor. Quisque id diam vel quam elementum pulvinar. Gravida in fermentum et sollicitudin ac orci phasellus. Facilisis gravida neque convallis a cras semper. Non arcu risus quis varius quam quisque id.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-4" aria-expanded="false">
                                        Returns and refunds
                                    </h6>
                                    <div id="faq-item-2-4" className="collapse" data-bs-parent="#accordion_2">
                                        <div className="card-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Proin libero nunc consequat interdum. Condimentum lacinia quis vel eros donec ac. Mauris sit amet massa vitae tortor. Quisque id diam vel quam elementum pulvinar. Gravida in fermentum et sollicitudin ac orci phasellus. Facilisis gravida neque convallis a cras semper. Non arcu risus quis varius quam quisque id.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-5" aria-expanded="false">
                                        Are my details secured?
                                    </h6>
                                    <div id="faq-item-2-5" className="collapse" data-bs-parent="#accordion_2">
                                        <div className="card-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Proin libero nunc consequat interdum. Condimentum lacinia quis vel eros donec ac. Mauris sit amet massa vitae tortor. Quisque id diam vel quam elementum pulvinar. Gravida in fermentum et sollicitudin ac orci phasellus. Facilisis gravida neque convallis a cras semper. Non arcu risus quis varius quam quisque id.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-6" aria-expanded="false">
                                        Sale code is not working
                                    </h6>
                                    <div id="faq-item-2-6" className="collapse" data-bs-parent="#accordion_2">
                                        <div className="card-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Proin libero nunc consequat interdum. Condimentum lacinia quis vel eros donec ac. Mauris sit amet massa vitae tortor. Quisque id diam vel quam elementum pulvinar. Gravida in fermentum et sollicitudin ac orci phasellus. Facilisis gravida neque convallis a cras semper. Non arcu risus quis varius quam quisque id.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-7" aria-expanded="false">
                                        How do I make payment by my credit card
                                    </h6>
                                    <div id="faq-item-2-7" className="collapse" data-bs-parent="#accordion_2">
                                        <div className="card-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Proin libero nunc consequat interdum. Condimentum lacinia quis vel eros donec ac. Mauris sit amet massa vitae tortor. Quisque id diam vel quam elementum pulvinar. Gravida in fermentum et sollicitudin ac orci phasellus. Facilisis gravida neque convallis a cras semper. Non arcu risus quis varius quam quisque id.</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="need-support text-center">
                                <h2>Still need help? Reach out to support 24/7:</h2>
                                <div className="btn-wrapper mb-30 go-top">
                                    <Link to="/#" className="theme-btn-1 btn">Contact Us</Link>
                                </div>
                                <h3><i className="fas fa-phone" /> +0123-456-789</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <aside className="sidebar-area ltn__right-sidebar">
                            {/* Newsletter Widget */}
                            <div className="widget ltn__search-widget ltn__newsletter-widget">
                                <h6 className="ltn__widget-sub-title">// subscribe</h6>
                                <h4 className="ltn__widget-title">Get Newsletter</h4>
                                <form action="#">
                                    <input type="text" name="search" placeholder="Search" />
                                    {/* type="submit" */}
                                    <button><i className="fas fa-search" /></button>
                                </form>
                                <div className="ltn__newsletter-bg-icon">
                                    <i className="fas fa-envelope-open-text" />
                                </div>
                            </div>
                            {/* Banner Widget */}
                            {/* <div className="widget ltn__banner-widget go-top">
                                <Link to="/product-details"><img src={publicUrl + "assets/img/banner/banner-3.jpg"} alt="Banner Image" /></Link>
                            </div> */}
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqV1