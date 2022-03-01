import React, { useEffect, useState } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/new-page-header';
import AddListing from './section-components/add-listing';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import axios from 'axios';
import CryptoJS from 'crypto-js'
import { GetStructureType, GetBHKType, GetRooms, GetPreferredTenants, GetFurnishing, GetParking, GetBathroom, GetAvailability, GetPropertyType, GetAmenities } from '../components/apiActions/index';


const AddListing_V1 = () => {
    const [structure_type, setStructure_type] = useState([])
    const [floor_type, setFloor_type] = useState([])
    const [rooms_type, setRooms_type] = useState([])
    const [prefered_type, setPrefered_type] = useState([])
    const [furnishing_type, setFurnishing_type] = useState([])
    const [parking_type, setParking_type] = useState([])
    const [bathroom_type, setBathroom_type] = useState([])
    const [available, setAvailable] = useState([])
    const [property_type, setProperty_type] = useState([])
    const [amenities, setAmenities] = useState([])
    
    useEffect(() => {
        GetStructureType().then((data) => {
            setStructure_type(data.Response)
        })
        GetBHKType().then((data) => {
            setFloor_type(data.Response)
        })
        GetRooms().then((data)=>{
            setRooms_type(data.Response)
        })
        GetPropertyType().then((data) => {
            setProperty_type(data.Response)
        })
        GetPreferredTenants().then((data) => {
            setPrefered_type(data.Response)
        })
        GetFurnishing().then((data) => {
            setFurnishing_type(data.Response)
        })
        GetParking().then((data)=>{
            setParking_type(data.Response)
        })
        GetBathroom().then((data) => {
            setBathroom_type(data.Response)
        })
        GetAvailability().then((data) => {
            setAvailable(data.Response)
        })
        GetAmenities().then((data) => {
            setAmenities(data.Response)
        })
    }, [])
    return <div>
        <Navbar />
        <PageHeader headertitle="Add Listing" />
        <AddListing structure_type={structure_type} floor_type={floor_type} rooms_type={rooms_type} prefered_type={prefered_type} furnishing_type={furnishing_type} parking_type={parking_type} bathroom_type={bathroom_type} available={available} property_type={property_type} amenities={amenities} />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default AddListing_V1

