import React, { useState, useEffect } from 'react';
import ProSlider from './new-product-slider';
import Offer from './image-offer';
import Footer from '../global-components/footer';
import { Link } from 'react-router-dom';
import Modal from '../Model';
import PageHeader from '../global-components/background';



const Wallet_page = () => {
    const [test, setTest] = useState(false);
    const [scrollPosition, setScrollPosition] = useState('right-container');
    const [isModalVisible, setIsModalVisible] = useState(false);


    let img1 = "https://assets.nobroker.in/nb-new/public/Wallet/earn_icon.svg";
    let img3 = "https://assets.nobroker.in/nb-new/public/Wallet/wallet.svg";
    const handleScroll = () => {
        const position = window.pageYOffset;
        // setScrollPosition(position);
        console.log(position, "scrollPosition")

        if (position <= 1140 && position >= 0) {
            // alert("test")
            setScrollPosition('right-container')
        } else if (position >= 1204 && position <= 1240) {
            setScrollPosition('right-container3')
        } else if (position >= 1360 && position <= 1505) {
            setScrollPosition('right-container4')
        } else if (position >= 1506 && position <= 1773) {
            setScrollPosition('right-container5')
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // return () => {
        //     window.removeEventListener("scroll", handleScroll);
        // };
    }, []);

    return (
        <div className="ltn__login-area">
            <div className='page-header-wt'>
                <PageHeader />
            </div>
            <div className="container web-wallet">
                <div className="row">
                    <div className="col-lg-12">
                        {/* <div className="wallet-header mt-35">
                        </div> */}
                        <div className="row">
                            <div className="col-lg-12 wallet-container">
                                <div className='left-container'>
                                    <div className="col-lg-12 top_header">
                                        <div className="col-lg-9 text-start">
                                            <div className='nw-cash'>NWcash</div>
                                            <div className='nw-content'>Quick and Convenient Way to Pay</div>
                                            <div className='col-lg-12 top-btn'>
                                                <div className='col-lg-6'>
                                                    <img src={img1} />
                                                    <div>Redeem</div>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <img src={img1} />
                                                    <div>Redeem</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 text-end">
                                            <div className='nw-amount'>₹2,000</div>
                                            <div className='nw-content'>Total Balance</div>
                                            <div className='how-use'>how to use?</div>
                                        </div>
                                    </div>

                                    <div className='col-lg-12 nb__2VYyZ'>
                                        ₹2,000
                                        <img src={img1} />
                                        NWcash will expire on 8 Feb 2022
                                    </div>
                                    <div className='break-space'></div>
                                    <Offer />
                                    <div className='break-space'></div>
                                    <ProSlider />
                                    <div className='break-space'></div>
                                    <div className='col-lg-12'>
                                        <div className='question'>Frequently asked questions</div>
                                        <div className='collaps-Containers'>
                                            <div className='collaps-header' onClick={() => setTest(!test)}>
                                                <div>Guaranteed tenants or Moneyback</div>
                                                {test ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-right"></i>}
                                            </div>
                                            {test && <div className='collaps-content'>
                                                <div className='descriptions'>
                                                    <ul>
                                                        <li>A dog is a type of domesticated animal.
                                                            Known for its loyalty and faithfulness,
                                                            it can be found as a welcome guest in many households across the world..</li>
                                                    </ul>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${scrollPosition}`}>
                                    <div className='col-lg-12'>
                                        <div className='my-heading'>My Recent Transactions </div>
                                        <div className='nb__1S0gN'>Total Balance</div>
                                        <div className='col-lg-12 nb__U6FD_'>
                                            <img src={img3} />
                                            <div className='nb__U6FD_'>
                                                <div className='col-lg-9 nb__8kQ5D'>
                                                    <div>Welcome Bonus</div>
                                                    <button>success</button>
                                                    <div className='nb__1ip5'>  sale available on the website, we can match you with a house you will want to call home</div>
                                                </div>
                                                <div className='col-lg-3 nb__ykf7e'>+₹2,000</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Footer />
                </div>
            </div>

            <div className="container mob-wallet">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wallet-header mt-70">
                            <div className='row'>
                                <div className='col-lg-12 cash-head'>
                                    <div className='col-lg-6 mb-nw-cash'>NW Cash</div>
                                    <div className='col-lg-6 history-mb' onClick={() => setIsModalVisible(true)}><i class="fas fa-history"></i>History</div>
                                </div>
                            </div>
                            <div className='nw-amount text-end pr-15'>₹2,000</div>
                            <div className='nw-content text-end pr-15'>Total Balance</div>
                            <div className='col-lg-12 top-btn'>
                                <div className='col-lg-6'>
                                    <img src={img1} />
                                    <div>Redeem</div>
                                </div>
                                <div className='col-lg-6'>
                                    <img src={img1} />
                                    <div>Redeem</div>
                                </div>
                            </div>
                        </div>
                        <Offer />
                        <ProSlider />
                        <div className='col-lg-12'>
                            <div className='question'>Frequently asked questions</div>
                            <div className='collaps-Containers'>
                                <div className='collaps-header' onClick={() => setTest(!test)}>
                                    <div>Guaranteed tenants or Moneyback</div>
                                    {test ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-right"></i>}
                                </div>
                                {test && <div className='collaps-content'>
                                    <div className='descriptions'>
                                        <ul>
                                            <li>A dog is a type of domesticated animal.
                                                Known for its loyalty and faithfulness,
                                                it can be found as a welcome guest in many households across the world..</li>
                                        </ul>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Footer />
                    </div>
                </div>
                <Modal show={isModalVisible} handleClose={() => setIsModalVisible(false)}>
                    <div className="ltn__quick-view-modal-inner">
                        {/* <div className="container">
						<div className="row"> */}
                        <div className="col-lg-12 text-center modalHeading">My Recent Transactions</div>
                        {/* </div>
						</div> */}
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 text-center">
                                    <div className='nb__1S0gN'>Total Balance</div>
                                    <div className='col-lg-12 nb__U6FD_'>
                                        <img src={img3} />
                                        <div className='nb__U6FD_'>
                                            <div className='col-lg-9 nb__8kQ5D'>
                                                <div>Welcome Bonus</div>
                                                <button>success</button>
                                                <div className='nb__1ip5'>  sale available on the website, we can match you with a house you will want to call home</div>
                                            </div>
                                            <div className='col-lg-3 nb__ykf7e'>+₹2,000</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal>
            </div>

        </div >
    )
}

export default Wallet_page
