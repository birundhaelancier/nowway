import React, { useEffect, useRef, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import BannerV6 from './section-components/banner-v6';
import Aboutv2 from './section-components/about-v2';
import Featuresv1 from './section-components/features-v1';
import ProSlider from './section-components/product-slider-v4';
import Advertisement from './section-components/advertisement';
import Category from './section-components/category-v1';
import Testimonial from './section-components/testimonial-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { GetPropertyType, GetLocations, GetAmenities } from '../components/apiActions/index';

const Home_V7 = (props) => {
    const params = new URLSearchParams(props.location.search);
    const EditText = params.get('edit');
    const myRef = useRef(null)
    const [property_type, setProperty_type] = useState([])
    const [location, setLocation] = useState([])
    const [amenities_val, setAmenities_val] = useState([])


    useEffect(() => {
        myRef.current.scrollIntoView()
        GetPropertyType().then((data) => {
            setProperty_type(data.Response)
        })
        GetLocations().then((data) => {
            setLocation(data.Response)
        })
        GetAmenities().then((amenities_data) => {
            setAmenities_val(amenities_data.Response)
        })
    }, [])
    return <div>
        <Navbar CustomClass="ltn__header-transparent gradient-color-2" />
        <BannerV6 property_type={property_type} location={location} />
        <Featuresv1 customClass="ltn__feature-area section-bg-1" />
        {/* <Aboutv2 /> */}
        <div ref={myRef}>
            <Advertisement />
        </div>
        <ProSlider />

        {/* <Gallery /> */}
        {/* <Apartment CustomClass="pt-115" /> */}
        {/* <VideoV1 /> */}
        <Category amenities_val={amenities_val} />
        <Testimonial />
        {/* <BlogSlider customClass="section-subtitle-2"/> */}
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Home_V7

