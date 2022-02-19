import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import Faq from './section-components/faq-v1';
import Counter from './section-components/counter-v1';
import BlogSlider from './blog-components/blog-slider-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetFaqDetails } from '../components/apiActions/index';

const FaqV1 = () => {
    const [faq_details, setFaq_details] = useState([])

    useEffect(() => {
        GetFaqDetails().then((data)=>{
            setFaq_details(data.Response)
        })
    }, [])
    return <div>
        <Navbar />
        <PageHeader headertitle="Frequently asked questions" subheader="FAQ" />
        <Faq faq_details={faq_details} />
        {/* <Counter /> */}
        {/* <BlogSlider sectionClass="pt-120" /> */}
        <CallToActionV1 />
        <Footer />
    </div>
}

export default FaqV1

