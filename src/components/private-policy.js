import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import Policy from './section-components/policy';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetPolicy } from './apiActions/index';

const PrivatePolicy = (props) => {
    const [policy, setPolicy] = useState([])
    useEffect(() => {
        GetPolicy().then((data) => {
            setPolicy(data.Response)
        })
    }, [])
    // const params = new URLSearchParams(props.location.search);
    // const user = params.get('edit');
    return <div>
        <Navbar />
        <PageHeader headertitle="Privacy and Policy" subheader="Policy" />
        <Policy policy={policy} />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default PrivatePolicy

