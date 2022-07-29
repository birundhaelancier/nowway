import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import ServiceDetails from './section-components/service-details';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetSubService } from '../components/apiActions/index';
import {Helmet} from "react-helmet";
import { useParams } from 'react-router-dom';
const Service_Details = (props) => {
    const params = new URLSearchParams(props.location.search);
    const { code } =useParams()
    const EditText = params.get('edit');
    const ser_image = params.get('image');
    const ser_name = params.get('ser_name');
    const service =params.get('service')
    const [sub_services, setSub_services] = useState();

    useEffect(() => {
        GetSubService(code).then((data) => {
            setSub_services(data.Response)
        })
    }, [])

    return <div>
        <Helmet>
        <title>About - yoursite.com</title>
        <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
        <Navbar />
        <PageHeader headertitle={sub_services &&sub_services[0]?.service_name} subheader={sub_services &&sub_services[0]?.service_name} />
        <ServiceDetails sub_services={sub_services} ser_image={ser_image} service={service} ser_id={code}/>
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Service_Details

