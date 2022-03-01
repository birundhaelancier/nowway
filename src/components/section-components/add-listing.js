import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Select, Checkbox } from 'antd';
import SelectInput from '../Select/index';
import { InsertListing } from '../apiActions/index';
import { notification } from "antd";
import { APIURL, REQUEST_HEADERS } from "../apiActions/baseHeaders";
import axios from 'axios';
import CryptoJS from 'crypto-js'

var CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) });
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams;
    }
}


const AddListing = ({ structure_type, floor_type, property_type, prefered_type, furnishing_type, parking_type, bathroom_type, available, amenities }) => {
    const { Option } = Select;
    const [selectedFile, setSelectedFile] = useState({});
    const [zipCodeErr, setZipCodeErr] = useState(false)
    const initialValues = {
        title: "",
        description: "",
        price: "",
        afterPrice: "",
        beforePrice: "",
        yearlyTax: "",
        ownerFee: "",
        propertyType: "",
        types: "",
        images: [],
        address: "",
        city: "",
        state: "",
        country: "",
        neighbourhood: "",
        zipCode: "",
        size: "",
        lotSize: "",
        rooms: "",
        bedRooms: "",
        pathRooms: "",
        garges: "",
        yearBuilt: "",
        garageSize: "",
        basement: "",
        availableFrom: "",
        extra_details: "",
        roofing: "",
        exteriorMaterial: "",
        structureType: "",
        floors: "",
        owner_note: "",
        bhk_type: "",
        tenants: "",
        furnishing: "",
        parking: "",
        bathroom: "",
        availability: "",
        amenities: "",
    };
    const [listValues, setListValues] = useState(initialValues);
    const [checkList, setCheckList] = useState([]);
    const mypass = "$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq"

    const decryptValue = (data) => {
        var res = JSON.parse(CryptoJS.AES.decrypt(data, mypass, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8));
        return res
    }
    const handleChange = (e, key, name, row, id) => {

        if (key === "select") {
            setListValues({
                ...listValues,
                [name]: e,
            });
        } else if (key === "checkbox") {
            let arrValues = []
            if (e.target.checked === true) {
                arrValues = [...listValues[name], String(e.target.value)]
                // setCheckList([...checkList, String(e.target.value)])
            } else {
                const selectedAcc = listValues[name].filter(a => {
                    if (a === String(e.target.value)) return false;
                    return true;
                });
                arrValues = [...selectedAcc]
                // setCheckList([...selectedAcc])
            }
            setListValues({
                ...listValues,
                [name]: arrValues,
            });
        } else if (key === "radio") {
            setListValues({
                ...listValues,
                [name]: e,
            });
        } else if (key === "files") {
            let reader = new FileReader();
            let file = e.target.files[0];
            setCheckList(file)

            // reader.onload = function (upload) {
            //     setCheckList(upload.target.result);
            // };

            // reader.readAsDataURL(file)

            setListValues({
                ...listValues,
                [name]: e.target.files,
            });
        } else {
            const { name, value } = e.target;
            if (name === "zipCode") {
                if (value.length !== 6) {
                    setZipCodeErr(true)
                } else {
                    setZipCodeErr(false)
                }
            }
            setListValues({
                ...listValues,
                [name]: value,
            });
        }
    }
    console.log(checkList, listValues.images)

    const submitForm = async (e) => {
        e.preventDefault();

        if (!zipCodeErr) {
            InsertListing(listValues, checkList).then((data) => {
                console.log(data, "ss")
                if (data.Status === "Success") {
                    notification.success({
                        message: data.Message
                    })
                    handleCancel()
                } else {
                    notification.error({
                        message: data.Message
                    })
                }
            })
        }
    }
    const options = [
        {
            name: "Rent",
            id: 1,
        },
        {
            name: "Sell",
            id: 2,
        },
    ];
    const handleCancel = () => {
        Object.keys(initialValues).map((data) => {
            listValues[data] = ""
        })
        setListValues((prevState) => ({
            ...prevState,
        }));
    }
    const test = () => {
        const formData = new FormData();
      
        console.log(formData, listValues.images, listValues.images.name, "li")
    }

console.log("cfghjk",checkList)
    return (
        <div className="ltn__appointment-area pb-120">
            <div className="container">
                <div className="row">
                    
                    <div className="col-lg-12">
                        <div className="ltn__appointment-inner">
                            <form onSubmit={(e) => submitForm(e)}>
                                <h2>1. Description</h2>
                                <p><small>These fields are mandatory: Title, Property Media</small></p>
                                <h6>Property Description</h6>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"title"} value={listValues.title} onChange={(e) => handleChange(e)} placeholder="*Title (mandatory)" />
                                        </div>
                                        <div className="input-item input-item-textarea ltn__custom-icon">
                                            <textarea required name={"description"} value={listValues.description} onChange={(e) => handleChange(e)} placeholder="Description" defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                                <h6>Property Price</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"price"} value={listValues.price} onChange={(e) => handleChange(e)} placeholder="Price in ₹ (only numbers)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"afterPrice"} value={listValues.afterPrice} onChange={(e) => handleChange(e)} placeholder="After Price Label (ex: /month)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"beforePrice"} value={listValues.beforePrice} onChange={(e) => handleChange(e)} placeholder="Before Price Label (ex: from)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"yearlyTax"} value={listValues.yearlyTax} onChange={(e) => handleChange(e)} placeholder="Yearly Tax Rate" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"ownerFee"} value={listValues.ownerFee} onChange={(e) => handleChange(e)} placeholder="Homeowners Association Fee(monthly)" />
                                        </div>
                                    </div>
                                </div>
                                <h6>Select Categories</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-item">
                                            <SelectInput dropdown={property_type} placeholder={"None"} value={listValues.propertyType} changeData={(data) => handleChange(data, "select", "propertyType")} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item">
                                            <SelectInput dropdown={options} placeholder={"None"} value={listValues.types} changeData={(data) => handleChange(data, "select", "types")} />
                                        </div>
                                    </div>

                                </div>
                                <h2>2. Media</h2>
                                <h6>Listing Media</h6>
                                <input type="file" id="myFile" multiple name="images" className="btn theme-btn-3 mb-10"
                                    // value={selectedFile}
                                    onChange={(e) => handleChange(e, "files", "images")}
                                /><br />
                                <p>
                                    <small>* At least 1 image is for a valid submission.Minimum size is 500/500px.</small><br />
                                    <small>* PDF files upload supported as well.</small><br />
                                    <small>* Images might take longer to be processed.</small>
                                </p>
                                <h2>3. Location</h2>
                                <h6>Listing Location</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"address"} value={listValues.address} onChange={(e) => handleChange(e)} placeholder="*Address" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"country"} value={listValues.country} onChange={(e) => handleChange(e)} placeholder="Country" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"state"} value={listValues.state} onChange={(e) => handleChange(e)} placeholder="County / State" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"city"} value={listValues.city} onChange={(e) => handleChange(e)} placeholder="City" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"neighbourhood"} value={listValues.neighbourhood} onChange={(e) => handleChange(e)} placeholder="Neighbourhood" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="number" name={"zipCode"} value={listValues.zipCode} onChange={(e) => handleChange(e)} placeholder="Zip" />
                                            {zipCodeErr && <div className='errMsg'>Zip Code should be 6 digit only</div>}
                                        </div>
                                    </div>
                                </div>
                                <h2>4. Details</h2>
                                <h6>Listing Details</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="number" name={"size"} value={listValues.size} onChange={(e) => handleChange(e)} placeholder="Size in ft2 (*only numbers)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="number" name={"lotSize"} value={listValues.lotSize} onChange={(e) => handleChange(e)} placeholder="Lot Size in ft2 (*only numbers)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="number" name={"rooms"} value={listValues.rooms} onChange={(e) => handleChange(e)} placeholder="Rooms (*only numbers)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="number" name={"bedRooms"} value={listValues.bedRooms} onChange={(e) => handleChange(e)} placeholder="Bedrooms (*only numbers)" />
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="number" name={"pathRooms"} value={listValues.pathRooms} onChange={(e) => handleChange(e)} placeholder="Bathrooms (*only numbers)" />
                                        </div>
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"garges"} value={listValues.garges} onChange={(e) => handleChange(e)} placeholder="Garages (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="number" name={"yearBuilt"} value={listValues.yearBuilt} onChange={(e) => handleChange(e)} placeholder="Year Built (*numeric)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"garageSize"} value={listValues.garageSize} onChange={(e) => handleChange(e)} placeholder="Garage Size (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="date" name={"availableFrom"} value={listValues.availableFrom} onChange={(e) => handleChange(e)} placeholder="Available from (*date)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"basement"} value={listValues.basement} onChange={(e) => handleChange(e)} placeholder="Basement (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"extra_details"} value={listValues.extra_details} onChange={(e) => handleChange(e)} placeholder="Extra Details (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"roofing"} value={listValues.roofing} onChange={(e) => handleChange(e)} placeholder="Roofing (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input required type="text" name={"exteriorMaterial"} value={listValues.exteriorMaterial} onChange={(e) => handleChange(e)} placeholder="Exterior Material (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item">
                                            <SelectInput dropdown={structure_type} placeholder={"Structure Type"} value={listValues.structureType} changeData={(data) => handleChange(data, "select", "structureType")} />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item">
                                            <SelectInput dropdown={floor_type} placeholder={"Floors No"} value={listValues.floors} changeData={(data) => handleChange(data, "select", "floors")} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-item input-item-textarea ltn__custom-icon">
                                            <textarea required name={"owner_note"} value={listValues.owner_note} onChange={(e) => handleChange(e)} placeholder="Owner/Agent notes (*not visible on front end)" defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                                <h2>5. Features</h2>
                                <h6 className="mt-20">BHK Type</h6>
                                <div className="row">
                                    {floor_type.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6">
                                                <label className="radio-item" key={index}>
                                                    <input required
                                                        type="radio"
                                                        name='bhk_type'
                                                        value={listValues.bhk_type}
                                                        // defaultChecked={index === 0}
                                                        onChange={() => handleChange(data.name, "radio", "bhk_type")}
                                                    />
                                                    <span className="checkmark"  >{data.name}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h6 className="mt-20">Preferred Tenants</h6>
                                <div className="row">
                                    {prefered_type.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 checkbox-view">
                                                <Checkbox checked={
                                                    listValues.tenants.lastIndexOf(String(data.name)) >= 0 ? true : false
                                                } onChange={(e) => handleChange(e, "checkbox", "tenants", data.id, index + 1)} name={data.name} value={data.name} />
                                                <div className='checkbox-Data'>{data.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h6 className="mt-20">Furnishing</h6>
                                <div className="row">
                                    {furnishing_type.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 checkbox-view">
                                                <Checkbox checked={
                                                    listValues.furnishing.lastIndexOf(String(data.name)) >= 0 ? true : false
                                                } onChange={(e) => handleChange(e, "checkbox", "furnishing", data.id, index + 1)} name={data.name} value={data.name} />
                                                <div className='checkbox-Data'>{data.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h6>Parking</h6>
                                <div className="row">
                                    {parking_type.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 checkbox-view">
                                                <Checkbox checked={
                                                    listValues.parking.lastIndexOf(String(data.name)) >= 0 ? true : false
                                                } onChange={(e) => handleChange(e, "checkbox", "parking", data.id, index + 1)} name={data.name} value={data.name} />
                                                <div className='checkbox-Data'>{data.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h6 className="mt-20">Bathroom</h6>
                                <div className="row">
                                    {bathroom_type.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6">
                                                <label className="radio-item" key={index}>
                                                    <input required
                                                        type="radio"
                                                        name='bathroom'
                                                        value={listValues.bathroom}
                                                        // defaultChecked={index === 0}
                                                        onChange={() => handleChange(data.name, "radio", "bathroom")}
                                                    />
                                                    <span className="checkmark"  >{data.name}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h6 className="mt-20">Availability</h6>
                                <div className="row">
                                    {available.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6">
                                                <label className="radio-item" key={index}>
                                                    <input required
                                                        type="radio"
                                                        name='availability'
                                                        value={listValues.availability}
                                                        // defaultChecked={index === 0}
                                                        onChange={() => handleChange(data.name, "radio", "availability")}
                                                    />
                                                    <span className="checkmark"  >{data.name}</span>
                                                </label>
                                            </div>
                                        )
                                    })}

                                </div>
                                <h6 className="mt-20">Amenities</h6>
                                <div className="row">
                                    {amenities.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 checkbox-view">
                                                <Checkbox checked={
                                                    listValues.amenities.lastIndexOf(String(data.name)) >= 0 ? true : false
                                                } onChange={(e) => handleChange(e, "checkbox", "amenities", data.id, index + 1)} name={data.name} value={data.name} />
                                                <div className='checkbox-Data'>{data.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="alert alert-warning d-none" role="alert">
                                    Please note that the date and time you requested may not be available. We will contact you to confirm your actual appointment details.
                                </div>
                                <div className="btn-wrapper text-center mt-30 mb-15">
                                    <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">Submit Property</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddListing