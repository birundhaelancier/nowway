import React,{useState,useEffect} from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/page-header';
import ShopRightSidebar from './shop-components/shop-right-sidebar';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import { GetPropertyType_Search,GetAmenities,GetPropertyType,GetLocations } from '../components/apiActions/index';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const ShopRightSidebarPage = (props) => {
    let { id }=useParams()
    const [Property_Details, setProperty_Details] = useState([])
    const [Amenities,setAmenities]=useState([])
    const [Location,setLocation]=useState([])
    const [Property_type,setProperty_type]=useState([])
    useEffect(() => {
      
        GetAmenities().then((data) => {
            setAmenities(data.Response)
        })
        GetPropertyType().then((data) => {
            setProperty_type(data.Response)
        })
        GetLocations().then((data) => {
            setLocation(data.Response)
        })
    },[])  
  
    return <div>
        <Navbar />
        <PageHeader headertitle="Shop Right Sidebar" />
        <ShopRightSidebar Property_Detail={Property_Details} Property_type={Property_type} Amenities={Amenities} Type={props?.location?.state}/>
        <CallToActionV1 Property_Detail={Property_Details}/>
        <Footer />
    </div>
}

export default ShopRightSidebarPage

