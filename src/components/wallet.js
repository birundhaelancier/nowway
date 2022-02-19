import React from 'react';
import Navbar from './global-components/navbar-v4';
import Wallet_page from './section-components/wallet-page';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const Wallet = () => {
    return <div>
        <Navbar CustomClass="ltn__header-transparent gradient-color-2" />

        <Wallet_page />
        {/* <CallToActionV1 /> */}
        {/* <Footer /> */}
    </div>
}

export default Wallet;

