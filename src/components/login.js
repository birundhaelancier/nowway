import React from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/page-header';
import Login from './section-components/login';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const LoginV1 = (props) => {
    const params = new URLSearchParams(props.location.search);
    const user = params.get('edit');
    return <div>
        <Navbar user={user} />
        {/* <PageHeader headertitle="Account" subheader="Login" /> */}
        <Login />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default LoginV1

