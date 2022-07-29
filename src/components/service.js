import React, { useState, useEffect } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import AboutV5 from './section-components/about-v5';
import ServiceV1 from './section-components/service-v1';
import BlogSlider from './blog-components/blog-slider-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetServiceDetails } from '../components/apiActions/index';
import { Helmet } from 'react-helmet';
import { Visit_OurPages } from '../Redux/Action/allActions';
import { useDispatch } from 'react-redux';


const Service_V1 = () => {
    const [service, setService] = useState([])
    let dispatch=useDispatch()

    useEffect(() => {
        GetServiceDetails().then((data) => {
            setService(data.Response)
        })
        dispatch(Visit_OurPages("serviceDetails",))
    }, [])
    return <div>
      
         <Navbar />
        <PageHeader headertitle="What We Do" subheader="Service" />
        {/* <AboutV5 /> */}
        <ServiceV1 service={service} />
        {/* <BlogSlider sectionClass="pt-120" /> */}
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Service_V1

