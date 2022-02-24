import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import ProductSlider from './shop-components/product-slider-v1';
import ProductDetails from './shop-components/shop-details';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetProductDetails } from '../components/apiActions/index';


const Product_Details = (props) => {
    const params = new URLSearchParams(props.location.search);
    const Product_id = params.get('product_id');
    const [productDetailsInfo, setProductDetailsInfo] = useState();
    useEffect(() => {
        GetProductDetails(Product_id).then((data) => {
            setProductDetailsInfo(data.Response)
        })
    }, [])
    return <div>
        <Navbar />
        <PageHeader headertitle="Product Details" customclass="mb-0" />
        <ProductSlider />
        <ProductDetails ProductInfo={productDetailsInfo} />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Product_Details

