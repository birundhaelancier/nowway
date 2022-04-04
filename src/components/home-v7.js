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
import ServiceV1 from './section-components/service-v1';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { GetPropertyType, GetLocations, GetAmenities, GetHomeOffer, GetHomeList,GetServiceDetails } from '../components/apiActions/index';

const Home_V7 = (props) => {
    const params = new URLSearchParams(props.location.search);
    const EditText = params.get('edit');
    const myRef = useRef(null)
    const [property_type, setProperty_type] = useState([])
    const [location, setLocation] = useState([])
    const [amenities_val, setAmenities_val] = useState([])
    const [home_offers, setHome_offer] = useState([])
    const [home_list, setHome_list] = useState([])
    const [Wish_list, setWish_list] = useState([])
    const [service, setService] = useState([])




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
        GetHomeOffer().then((data) => {
            setHome_offer(data.Response)
        })
        GetHomeList().then((data) => {
            setHome_list(data.Response)
        })
        GetServiceDetails().then((data) => {
            setService(data.Response)
        })
    }, [])

    return <div>
        <Navbar CustomClass="ltn__header-transparent gradient-color-2" Wish_list={Wish_list} />
        <BannerV6 property_type={property_type} location={location} />
        <ServiceV1 service={service}/>
        {/* <Aboutv2 /> */}
        <div ref={myRef}>
            <Advertisement home_offers={home_offers} />
        </div>
        <Featuresv1 customClass="ltn__feature-area section-bg-1" home_offers={home_offers} />

        <ProSlider list={home_list} callWish={(data)=>setWish_list(data)}/>
        <Category amenities_val={amenities_val} />
        <Testimonial />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Home_V7

