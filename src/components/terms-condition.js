import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import Terms from './section-components/terms';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetTerms } from './apiActions/index';

const TermCondition = (props) => {
    const [terms, setTerms] = useState([])
    useEffect(() => {
        GetTerms().then((data) => {
            setTerms(data.Response)
        })
    }, [])
    // const params = new URLSearchParams(props.location.search);
    // const user = params.get('edit');
    return <div>
        <Navbar />
        <PageHeader headertitle="Terms and Condition" subheader="Terms" />
        <Terms terms={terms} />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default TermCondition

