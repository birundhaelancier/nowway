import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import ProductSlider from './shop-components/product-slider-v1';
import ProductDetails from './shop-components/shop-details';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetProductDetails,GetRelatedProducts,Top_Categories,AddPropertyview } from '../components/apiActions/index';


const Product_Details = (props) => {
    const params = new URLSearchParams(props.location.search);
    const Product_id = params.get('product_id');
    const [productDetailsInfo, setProductDetailsInfo] = useState();
    const [RelatedProducts,setRelatedProducts]=useState()
    const [TopCategory,setTopCategory]=useState([])
    useEffect(() => {
        GetProductDetails(Product_id).then((data) => {
            setProductDetailsInfo(data.Response)
        })
        GetRelatedProducts(Product_id).then((data)=>{
            setRelatedProducts(data.Response)
        })
        Top_Categories().then((data)=>{
            setTopCategory(data.Response)
        })
        AddPropertyview(Product_id).then((data)=>{
            // setTopCategory(data.Response)
        })
       
    }, [])
    return <div>
        <Navbar />
        <PageHeader headertitle="Product Details" customclass="mb-0" />
        <ProductSlider ProductInfo={productDetailsInfo}/>
        <ProductDetails ProductInfo={productDetailsInfo} RelatedProducts={RelatedProducts} TopCategory={TopCategory}/>
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Product_Details

