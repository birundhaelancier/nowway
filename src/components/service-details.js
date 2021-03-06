import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import ServiceDetails from './section-components/service-details';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetSubService } from '../components/apiActions/index';

const Service_Details = (props) => {
    const params = new URLSearchParams(props.location.search);
    const EditText = params.get('edit');
    const Details = params.get('details');
console.log(Details)
    const [sub_services, setSub_services] = useState();
    useEffect(() => {
        // GetSubService(EditText).then((data) => {
        //     setSub_services(data.Response)
        // })
    }, [])
    return <div>
        <Navbar />
        <PageHeader headertitle="Service Details" subheader="Service Details" />
        <ServiceDetails sub_services={sub_services} />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Service_Details

