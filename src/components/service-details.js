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
    const ser_image = params.get('image');
    const ser_name = params.get('ser_name');
    const service =params.get('service')
    console.log(EditText, "EditText")
    const [sub_services, setSub_services] = useState();
    useEffect(() => {
        GetSubService(EditText).then((data) => {
            setSub_services(data.Response)
            console.log("checkwwwwww",data)
        })
    }, [])
    return <div>
        <Navbar />
        <PageHeader headertitle="Service Details" subheader={sub_services &&sub_services[0]?.service_name} />
        <ServiceDetails sub_services={sub_services} ser_image={ser_image} service={service} ser_id={EditText}/>
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Service_Details

