import React from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import Plan from './section-components/plan-table';
import Counter from './section-components/counter-v1';
import BlogSlider from './blog-components/blog-slider-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const OwnwerPlan = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Plan and Pricing" subheader="Plan" />
        <Plan />
        {/* <Counter /> */}
        {/* <BlogSlider sectionClass="pt-120" /> */}
        <CallToActionV1 />
        <Footer />
    </div>
}

export default OwnwerPlan;

