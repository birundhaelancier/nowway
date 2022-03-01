import React from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import MyAccount from './shop-components/my-account';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const MyaccountV1 = (props) => {
    const params = new URLSearchParams(props.location.search);
    const wish = params.get('wish');
    return <div>
        <Navbar />
        <PageHeader headertitle="My Account" />
        <MyAccount wishnumber={wish} />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default MyaccountV1

