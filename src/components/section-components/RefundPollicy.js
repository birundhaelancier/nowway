import React, { useEffect, useState } from 'react';
import Navbar from '../global-components/navbar-v4';
import PageHeader from '../global-components/new-page-header';
import Footer from '../global-components/footer';
import { Refund_list } from '../apiActions'
import CallToActionV1 from '../section-components/call-to-action-v1';
const RefundPolicy = () => {
 const [RefundData,setRefundData]=useState([])    
useEffect(()=>{
    Refund_list().then((res)=>{
       setRefundData(res.Response)
    })
},[])
    return <div>
        <Navbar />
        <PageHeader headertitle="About Us" subheader="About" />
        <div className='container'>
          <p>
          Founded in 2022 Nowway is Chennai’s most innovative real estate advertising platform for home owners, landlords, developers, and real estate brokers. The company offers listings for new homes, resale homes, rentals, plots and co-living spaces in Chennai. Backed by strong research and analytics, the company’s experts provide comprehensive real estate services that cover advertising and marketing, sales solutions for real estate developers, personalized search, virtual viewing, AR&VR content, home loans, end-to-end transaction services, and post-transaction services to consumers for both buying and renting.
          </p>
          <p>
          Nowway is trusted home services platform. Our platform provides the best experience by connecting customers and trained service experts. We help customers book reliable home services such as deep cleaning, pest control, painting, sanitisation, and more - delivered by trusted and trained experts at their homes, seamlessly. As an Nowway Partner, service experts have the opportunity to win customers, earn more, and manage daily projects efficiently and profitably.
          </p>
          <p>
          Currently, our 100+ trained experts are serving over 1000+ happy customers. Launched in 2022.
          </p>
        </div>
        <CallToActionV1 />
        <Footer />
    </div>
}

export default RefundPolicy

