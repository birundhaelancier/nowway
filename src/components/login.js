import React, { useEffect,useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/page-header';
import Login from './section-components/login';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { Helmet } from 'react-helmet';

const LoginV1 = (props) => {
    // document.title =
    const [title, setTitle] = useState("Default Title");
    const params = new URLSearchParams(props.location.search);
    const user = params.get('edit');
    // useEffect(()=>{
    //     document.title = title;
    // },[title])
    return <div>
        <Helmet>
            <title>Welcome | here is your page title to display</title>
            {/* <meta id="meta-description" name="description" content="Some description." />
            <meta id="og-title" property="og:title" content="MyApp" />
            <meta id="og-image" property="og:image" content="path/to/image.jpg" /> */}
            <meta name="twitter:title" content="Login"/>
            <meta name="twitter:description" content="kkkkkk"/>
        </Helmet>
        <Navbar user={user} />
        {/* <PageHeader headertitle="Account" subheader="Login" /> */}
        <Login />
        <CallToActionV1 />
        <Footer />
    </div>
}
export default LoginV1

