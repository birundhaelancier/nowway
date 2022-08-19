import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import ProductSlider from './shop-components/product-slider-v1';
import ProductDetails from './shop-components/shop-details';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetProductDetails,GetRelatedProducts,Top_Categories,AddPropertyview } from '../components/apiActions/index';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Product_Details = (props) => {
    // document.title ="Welcome | here is your page title to display"; 
    // document.getElementsByTagName("META")[2].content="Your description about the page or site here to set dynamically";
    const params = new URLSearchParams(props.location.search);
    const { product_id } =useParams()
    // const Product_id = params.get('product_id');
    const type = params.get('type');
    const [productDetailsInfo, setProductDetailsInfo] = useState();
    const [RelatedProducts,setRelatedProducts]=useState()
    const [TopCategory,setTopCategory]=useState([])
    useEffect(() => {
        GetProductDetails(product_id,type).then((data) => {
            setProductDetailsInfo(data.Response)
            // console.log("fghgjk",data)
        })
        GetRelatedProducts(product_id).then((data)=>{
            setRelatedProducts(data.Response)
        })
        Top_Categories().then((data)=>{
            setTopCategory(data.Response)
        })
        AddPropertyview(product_id).then((data)=>{
            // setTopCategory(data.Response)
        })
       
    }, [product_id])


    return <div>
        <Helmet>
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-62e773a56c3c9de5"></script>
        </Helmet>
        <Navbar />
        <PageHeader headertitle="Product Details" customclass="mb-0" />
        <ProductSlider ProductInfo={productDetailsInfo}/>
        <ProductDetails ProductInfo={productDetailsInfo} RelatedProducts={RelatedProducts} TopCategory={TopCategory}/>
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Product_Details

