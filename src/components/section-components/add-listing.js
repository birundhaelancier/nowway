import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Select, Checkbox } from 'antd';
import SelectInput from '../Select/index';
import { InsertListing,GetLocations,GetListings_Data,GetMyList } from '../apiActions/index';
import { notification } from "antd";
import { APIURL, REQUEST_HEADERS } from "../apiActions/baseHeaders";
import axios from 'axios';
import CryptoJS from 'crypto-js'
import ValidationLibrary from '../validationfunction'
import { useHistory,useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import MediaComp from './MediaUpload'
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
    const [Location,setLocation]=useState([])
    const [property_id,setproperty_id]=useState(0)
    const [Property_List,setProperty_List]=useState({})
    const [Floors,setFloors]=useState([])
    const [Type,setType]=useState("Location")
    const { id } =useParams()
    let history=useHistory()
    const initialValues={
         price:{value:"",validation:[],error: null,errmsg: null},
         description:{value:"",validation:[],error: null,errmsg: null},
         title:{value:"",validation:[],error: null,errmsg: null},
         types:{value:"",validation:[],error: null,errmsg: null},
         propertyType:{value:"",validation:[],error: null,errmsg: null},
         floors: {value:"",validation:[],error: null,errmsg: null},
         owner_note: {value:"",validation:[],error: null,errmsg: null},
         bhk_type: {value:"",validation:[],error: null,errmsg: null},
         tenants:{value:"",validation:[],error: null,errmsg: null},
         furnishing:{value:"",validation:[],error: null,errmsg: null},
         parking:{value:"",validation:[],error: null,errmsg: null},
         bathroom:{value:"",validation:[],error: null,errmsg: null},
         availability:{value:"",validation:[],error: null,errmsg: null},
         amenities:{value:"",validation:[],error: null,errmsg: null},
         negotiate:{value:"",validation:[],error: null,errmsg: null},
         facing:{value:"",validation:[],error: null,errmsg: null},
         size:{value:"",validation:[],error: null,errmsg: null},
         maintenance:{value:"",validation:[],error: null,errmsg: null},
         city:{value:"",validation:[],error: null,errmsg: null},
         address:{value:"",validation:[],error: null,errmsg: null},
         advance:{value:"",validation:[],error: null,errmsg: null},
             
    }
  
    const [listValues, setListValues] = useState(initialValues);
    const [checkList, setCheckList] = useState([]);

  
    const handleChange = (e, key, type, row, id) => {    
      if (type === "checkbox") {
            let arrValues = []
            if (e.target.checked === true) {
                arrValues = [...listValues[key].value, String(e.target.value)]
            } else {
                const selectedAcc = listValues[key].value.filter(a => {
                    if (a === String(e.target.value)) return false;
                    return true;
                });
                arrValues = [...selectedAcc]
            }
            let Obj = {
                value: arrValues,
            };
            setListValues({
                ...listValues,
                [key]: Obj,
            });
        } else if (type === "radio") {
            let Obj = {
                value: e,
            };
            setListValues({
                ...listValues,
                [key]: Obj,
            });
        } else if (type === "files") {
          
            let file = e.target.files;
         
        } else {
            var errorcheck = ValidationLibrary.checkValidation(
                e,
                listValues[key].validation
            );
            let dynObj = {
                value: e,
                error: !errorcheck.state,
                errmsg: errorcheck.msg,
                validation: listValues[key].validation,
            };
            setListValues((prevState) => ({
                ...prevState,
                [key]: dynObj,
            }));
        }
    }
    const submitForm = async (e) => {
        e.preventDefault();
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
        {
            name: "Lease",
            id: 3,
        },
        {
            name: "Resale",
            id: 4,
        },
        {
            name: "Pg Hostel",
            id: 5,
        },
        {
            name: "Sale commercial",
            id: 6,
        },
        {
            name: "Rent commericial",
            id: 7,
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
  useEffect(()=>{
    GetLocations().then((res)=>{
        setLocation(res.Response)
   })
   let i;
   let floor=[]
   let Array_value=[{id:0,name:"Ground Floor"}]
   for(i=1;i<=20;i++){
    floor.push({id:i,name:i})
   }
   setFloors(Array_value.concat(floor))
   GetMyList().then((data) => {

    data.Response.filter((res)=>{
       if(res.id==id){
        setProperty_List(res)
       }
    })
   })

  },[id])
  useEffect(()=>{
    GetListings_Data().then((res)=>{
        const Data=res.Response
        listValues.bhk_type.value=Data.bhk_type || Property_List.bhk_type || ""
        listValues.floors.value=Data.floors || Property_List.floors || ""
        listValues.price.value=Data.price || Property_List.price || ""
        listValues.maintenance.value=Data.monthly_maintain || Property_List.monthly_maintain || ""
        listValues.negotiate.value=Data.negotiate || Property_List.negotiate || ""
        listValues.description.value=Data.description || Property_List.description || ""
        listValues.address.value=Data.address || Property_List.address || ""
        listValues.facing.value=Data.facing || Property_List.facing || ""
        listValues.size.value=Data.sq_ft || Property_List.sq_ft || ""
        listValues.propertyType.value=Data.type || Property_List.type || ""
        listValues.city.value=Data.city || Property_List.city || ""
        listValues.types.value=Data.property_type || Property_List.property_type || ""  
        setListValues((prevState) => ({
        ...prevState,
        }));
        })
       
  },[Property_List])

    const ChangeContinue=(key,value)=>{
        setType(key)
    }
 const Submit_ChangeContinue=(key,value,type)=>{ 
      
     if(Type==="Location"){
      listValues.propertyType.validation=[{ name: "required" }]
      listValues.city.validation=[{ name: "required" }]
      listValues.types.validation=[{ name: "required" }]
     }
     else if(Type==="Details"){
        listValues.bhk_type.validation=[{ name: "required" }] 
        listValues.floors.validation=[{ name: "required" }] 
        listValues.price.validation=[{ name: "required" }] 
        listValues.maintenance.validation=[{ name: "required" }] 
        listValues.negotiate.validation=[{ name: "required" }] 
        listValues.description.validation=[{ name: "required" }] 
        listValues.address.validation=[{ name: "required" }] 
        listValues.facing.validation=[{ name: "required" }] 
        listValues.size.validation=[{ name: "required" }] 
        // listValues.advance.validation=[{ name: "required" }] 
     }
    var mainvalue = {};
    var targetkeys = Object.keys(listValues);
    for (var i in targetkeys) {
        var errorcheck = ValidationLibrary.checkValidation(
            listValues[targetkeys[i]].value,
            listValues[targetkeys[i]].validation
        );
        listValues[targetkeys[i]].error = !errorcheck.state;
        listValues[targetkeys[i]].errmsg = errorcheck.msg;
        mainvalue[targetkeys[i]] = listValues[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => listValues[obj].error == true);
    if(filtererr.length>0){
        
    }else{
        if(Type==="Media" && checkList.length>=1 && checkList.length>=10){ 
        Swal.fire({
            title: 'Warning!',
            icon: 'warning',
            text: "Maximum 10 images is for a valid submission.",
        })
    
}else{
    InsertListing(listValues, checkList,Type,property_id).then((data) => {
        if (data.Status === "Success") {
            type==="submit"&&
            Swal.fire({
                title: 'Success!',
                icon: 'success',
                customClass:"custom_sweetalert",
                html: 
                '<div className="child_cont"><p>Congratulations<p>Thank you for Registering in Nowway.You have successfully Posted your property, it will be live Within 12 Hrs.For Any queries call : 8248699623 For mail : <a href="https://nowway.in">contact@nowway.in</a>  Download our app in playstore : (<a href="https://play.google.com/store/apps/details?id=com.nowwayreact">http://cutt.ly/XF4rplE</a>)  Visit anytime our website :<a href="https://nowway.in"> http://nowway.in</a></div></div>'
            })
            setproperty_id(id?id:data.Response.property_id)
            setType(type)
            type==="submit"&&history.push(`/my-account/wish=${2}`)
            // handleCancel()
        } else {
            type==="submit" && Swal.fire({
                title: 'Failed!',
                icon: 'error',
                text:data.Message,
            })
            
        }
    })
}
    }
    setListValues((prevState) => ({
        ...prevState,
    }));
}
const MediaUpload=({fileList})=>{
    console.log("listValues",fileList)
    setCheckList([...fileList])
}
    return (
        <div className="ltn__appointment-area pb-120">
            <div className="container">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="ltn__appointment-inner custom_change">
                            <form onSubmit={(e) => submitForm(e)}>
                                {/* <h2>1. Description</h2>
                                <p><small>These fields are mandatory: Title, Property Media</small></p> */}
                                {Type==="Location" && 
                               <> 
                               <h2>1. Location</h2>
                             
                                <div className="row">
                                   <div className="col-md-6">
                                   <h6>Select City<span>*</span></h6>
                                        <div className="input-item custom_sel">
                                            <SelectInput required dropdown={Location} value={listValues.city.value} changeData={(data) => handleChange(data, "city","select")} 
                                            error={listValues.city.error}
                                            errmsg={listValues.city.errmsg}
                                            />
                                        </div> 
                                    </div>
                                    <div className="col-md-6">
                                       <h6>Select Categories<span>*</span></h6>
                                        <div className="input-item custom_sel">
                                            <SelectInput required dropdown={options} value={listValues.propertyType.value} changeData={(data) => handleChange(data, "propertyType","select")} 
                                             error={listValues.propertyType.error}
                                             errmsg={listValues.propertyType.errmsg}/>
                                        </div>
                                    </div>
                                  
                                
  
                                   
                                    {/* <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"address"} value={listValues.address} onChange={(e) => handleChange(e)} placeholder="Address" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"country"} value={listValues.country} onChange={(e) => handleChange(e)} placeholder="Country" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"state"} value={listValues.state} onChange={(e) => handleChange(e)} placeholder="County / State" />
                                        </div>
                                    </div>
                                  
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"neighbourhood"} value={listValues.neighbourhood} onChange={(e) => handleChange(e)} placeholder="Neighbourhood" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="number" required name={"zipCode"} value={listValues.zipCode} onChange={(e) => handleChange(e)} placeholder="Zip" />
                                            {zipCodeErr && <div className='errMsg'>Zip Code should be 6 digit only</div>}
                                        </div>
                                    </div> */}
                                </div>
                              
                            
                               
                                <div className="row">
                               
                                    <div className="col-md-6">
                                    <h6>Select Apartment Type<span>*</span></h6>

                                        <div className="input-item custom_sel">
                                            <SelectInput required dropdown={property_type}  value={listValues.types.value} changeData={(data) => handleChange(data, "types", "select")} 
                                            error={listValues.types.error}
                                            errmsg={listValues.types.errmsg}
                                            />
                                        </div>
                                    </div>

                                </div>
                                </>
                              }
                             
                               {Type==="Location" && 
                               <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                               <div className="btn-wrapper text-end mt-30 mb-15">
                                    <button className="theme-btn-1 btn btn-block text-uppercase" onClick={()=>Submit_ChangeContinue("details",true,"Details")}>Continue</button>
                                </div>
                                </div>
                                }
                              
                                {Type==="Details" &&
                               <>
                                <h2>2. Details</h2>
                                {/* <h6>Listing Details</h6> */}
                                <div className="row">
                                    <div className="col-md-6">
                                    <h6>Select BHK Type<span>*</span></h6>
                                        <div className="input-item">
                                            <SelectInput required dropdown={floor_type} value={listValues.bhk_type.value} changeData={(data) => handleChange(data,  "bhk_type","select",)} 
                                            error={listValues.bhk_type.error}
                                            errmsg={listValues.bhk_type.errmsg}/>
                                        </div> 
                                    </div>

                                    <div className="col-md-6">
                                    <h6>Select Floors No<span>*</span></h6>
                                        <div className="input-item">
                                            <SelectInput required dropdown={Floors}  value={listValues.floors.value} changeData={(data) => handleChange(data,  "floors","select",)} 
                                            error={listValues.floors.error}
                                            errmsg={listValues.floors.errmsg}/>
                                        </div> 
                                    </div>
                                    <div className="col-md-6 mb-3">
                                    <h6>Price<span>*</span></h6>
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="number"  className={listValues.size.errmsg?'input_field':"input_field2"} required name={"price"} value={listValues.price.value} onChange={(e) => handleChange(e.target.value,"price")} />
                                            <div className='Errormsg'>{listValues.price.errmsg}</div>
                                        </div>
                                    </div>

                                   {listValues.propertyType.value==="Rent" && <div className="col-md-6">
                                    <h6>Advance Amount<span>*</span></h6>
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text"  className={listValues.advance.errmsg?'input_field':"input_field2"}  required name={"advance"} value={listValues.advance.value} onChange={(e) => handleChange(e.target.value,"advance")} />
                                            <div className='Errormsg'>{listValues.advance.errmsg}</div>
                                        </div>
                                    </div>}

                                    <div className="col-md-6">
                                    <h6>Monthly  Maintenance<span>*</span></h6>
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text"  className={listValues.size.errmsg?'input_field':"input_field2"}  required name={"maintence"} value={listValues.maintenance.value} onChange={(e) => handleChange(e.target.value,"maintenance")} />
                                            <div className='Errormsg'>{listValues.maintenance.errmsg}</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                    <h6>Carpet Area in Sq/ft<span>*</span></h6>
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="number" className={listValues.size.errmsg?'input_field':"input_field2"}     required name={"size"} value={listValues.size.value} onChange={(e) => handleChange(e.target.value,"size")}  />
                                            <div className='Errormsg'>{listValues.size.errmsg}</div>
                                        
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                    <h6>Negotiable<span>*</span></h6>
                                        <div className="input-item custom_sel">
                                            <SelectInput required dropdown={[{id:1,name:"Yes"},{id:2,name:"No"}]}  value={listValues.negotiate.value} changeData={(data) => handleChange(data, "negotiate","select")} 
                                            error={listValues.negotiate.error}
                                            errmsg={listValues.negotiate.errmsg}
                                            />
                                        </div> 
                                    </div>

                                    <div className="col-md-6">
                                    <h6>Facing<span>*</span></h6>
                                        <div className="input-item custom_sel">
                                            <SelectInput required dropdown={
                                                 [{id:1,name:"East"},{id:2,name:"West"},{id:3,name:"South"},{id:4,name:"North"},{id:5,name:"North East"},
                                                 {id:6,name:"South East"},{id:7,name:"North West"},{id:8,name:"South West"},{id:8,name:"No idea"}]
                                            }  value={listValues.facing.value} changeData={(data) => handleChange(data, "facing","select")} 
                                            error={listValues.facing.error}
                                            errmsg={listValues.facing.errmsg}
                                            />
                                        </div> 
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="number" required name={"lotSize"} value={listValues.lotSize} onChange={(e) => handleChange(e)} placeholder="Lot Size in ft2 (*only numbers)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="number" required name={"rooms"} value={listValues.rooms} onChange={(e) => handleChange(e)} placeholder="Rooms (*only numbers)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="number" required name={"bedRooms"} value={listValues.bedRooms} onChange={(e) => handleChange(e)} placeholder="Bedrooms (*only numbers)" />
                                        </div>
                                    </div>
                                   
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"garges"} value={listValues.garges} onChange={(e) => handleChange(e)} placeholder="Garages (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="number" required name={"yearBuilt"} value={listValues.yearBuilt} onChange={(e) => handleChange(e)} placeholder="Year Built (*numeric)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"garageSize"} value={listValues.garageSize} onChange={(e) => handleChange(e)} placeholder="Garage Size (*text)" />
                                        </div>
                                    </div> */}
                                    {/* <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="date" required name={"availableFrom"} value={listValues.availableFrom} onChange={(e) => handleChange(e)} placeholder="Available from (*date)" />
                                        </div>
                                    </div> */}
                                    {/* <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"basement"} value={listValues.basement} onChange={(e) => handleChange(e)} placeholder="Basement (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"extra_details"} value={listValues.extra_details} onChange={(e) => handleChange(e)} placeholder="Extra Details (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"roofing"} value={listValues.roofing} onChange={(e) => handleChange(e)} placeholder="Roofing (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"exteriorMaterial"} value={listValues.exteriorMaterial} onChange={(e) => handleChange(e)} placeholder="Exterior Material (*text)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item">
                                            <SelectInput required dropdown={structure_type} placeholder={"Structure Type"} value={listValues.structureType} changeData={(data) => handleChange(data, "select", "structureType")} />

                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12">
                                        <div className="input-item input-item-textarea ltn__custom-icon">
                                            <textarea required name={"owner_note"} value={listValues.owner_note} onChange={(e) => handleChange(e)} placeholder="Owner/Agent notes (*not visible on front end)" defaultValue={""} />
                                        </div>
                                    </div> */}
                                </div>
                               
                                {/* <h6>Property Description</h6> */}
                                <div className="row">
                            
                                <div className="col-md-6">
                                    <h6>Address Details<span>*</span></h6>
                                    <div className="input-item input-item-textarea ltn__custom-icon">
                                            <textarea className={listValues.address.errmsg?'input_field':"input_field2"}   required type="text" name={"address"} value={listValues.address.value} onChange={(e) => handleChange(e.target.value,"address")}  />
                                            <div className='Errormsg'>{listValues.address.errmsg}</div>
                                        </div>
                                    </div>    
                                
                                    <div className="col-md-6">
                                    <h6>Description<span>*</span></h6>
                                        <div className="input-item input-item-textarea ltn__custom-icon">
                                            <textarea  className={listValues.description.errmsg?'input_field':"input_field2"}   required name={"description"} value={listValues.description.value} onChange={(e) => handleChange(e.target.value,"description")}  defaultValue={""} 
                                           />
                                             <div className='Errormsg'>{listValues.description.errmsg}</div>
                                        </div>
                                        
                                      
                                    </div>
                                 
                                </div>
                                </>
                                }

                            {Type==="Details"&&
                               <div style={{display:"flex",justifyContent:"center"}}>
                               <div className="btn-wrapper text-end mt-30" style={{paddingRight:"20px"}}>
                                    <button className="theme-btn-1 btn btn-block text-uppercase" onClick={()=>ChangeContinue("Location",false)} type="submit">Back</button>
                                </div>

                                 <div className="btn-wrapper text-end mt-30 mb-15">
                                  <button className="theme-btn-1 btn btn-block text-uppercase" onClick={()=>Submit_ChangeContinue("features",true,"Features")} type="submit">Continue</button>
                                 </div>
                                 </div>
                                }
{/* 
                                <h6>Property Price</h6>
                                <div className="row">
                                   
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"afterPrice"} value={listValues.afterPrice} onChange={(e) => handleChange(e)} placeholder="After Price Label (ex: /month)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"beforePrice"} value={listValues.beforePrice} onChange={(e) => handleChange(e)} placeholder="Before Price Label (ex: from)" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"yearlyTax"} value={listValues.yearlyTax} onChange={(e) => handleChange(e)} placeholder="Yearly Tax Rate" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input  type="text" required name={"ownerFee"} value={listValues.ownerFee} onChange={(e) => handleChange(e)} placeholder="Homeowners Association Fee(monthly)" />
                                        </div>
                                    </div>
                                  
                                </div> */}

                               {Type==="Media" &&
                               <>
                                <h2>4. Media</h2>
                                <h6>Listing Media</h6>
                                {/* <div className='upload_file_change'>
                                <input type="file" id="myFile"  multiple name="images" className="btn theme-btn-3 mb-10"
                                    // value={selectedFile} 
                                    onChange={(e) => handleChange(e, "images","files")}
                                />
                               {checkList.length>0 && <label style={{position:"absolute",left:"173px",top:"17px"}}>{checkList.length} files</label>}
                               </div>
                                <br /> */}
                                <MediaComp fileList={checkList} handleChange={MediaUpload}/>
                                <p>
                                    <small>* Maximum 10 images is for a valid submission.Minimum size is 500/500px.</small><br />
                                    <small>* PDF files upload supported as well.</small><br />
                                    <small>* Images might take longer to be processed.</small>
                                </p>
                                </>
} 
                             {Type==="Media" &&
                                 <div style={{display:"flex",justifyContent:"center"}}>
                                <div className="btn-wrapper text-end mt-30" style={{paddingRight:"20px"}}>
                                    <button className="theme-btn-1 btn btn-block text-uppercase" onClick={()=>ChangeContinue("Features",false)} type="submit">Back</button>
                                </div>
                                <div className="btn-wrapper text-end mt-30 mb-15">
                                    <button className="theme-btn-1 btn btn-block text-uppercase" onClick={()=>Submit_ChangeContinue("features",true,"submit")} type="submit">Submit Property</button>
                                </div>
                                </div>
                                }
                                
                                {Type==="Features" &&
                               <>   
                                <h2>3.Features</h2>
                                <div className="row features_par">
                                {/* <div className="col-md-4">
                                <h6 className="mt-20">BHK Type</h6>

                                    {floor_type.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6">
                                                <label className="radio-item" key={index}>
                                                    <input 
                                                        required
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
                                    </div> */}
                              
                                <div className="col-md-4">
                                <h5 className="mt-20 mb-14">Preferred Tenants</h5>
                                <div className="checkbox-view">
                                    {prefered_type.map((data, index) => {
                                        return (
                                            <div className='d-flex'>
                                                <Checkbox checked={
                                                    listValues.tenants.value.lastIndexOf(String(data.name)) >= 0 ? true : false
                                                } onChange={(e) => handleChange(e, "tenants", "checkbox", data.id, index + 1)} name={data.name} value={data.name} ></Checkbox>
                                                <div className='checkbox-Data'>{data.name}</div>
                                            </div>
                                                
                                        )
                                    })}
                                </div>
                                </div>
                                <div className="col-md-4">
                                <h5 className="mt-20 mb-14">Furnishing</h5>
                                <div className="checkbox-view">
                                    {furnishing_type.map((data, index) => {
                                        return (
                                            <div className='d-flex'>
                                                <Checkbox checked={
                                                    listValues.furnishing.value.lastIndexOf(String(data.name)) >= 0 ? true : false
                                                } onChange={(e) => handleChange(e, "furnishing", "checkbox", data.id, index + 1)} name={data.name} value={data.name} ><div className='checkbox-Data'>{data.name}</div></Checkbox>
                                                {/* <div className='checkbox-Data'>{data.name}</div> */}
                                            </div>
                                        )
                                    })}
                                </div>
                                </div>
                                <div className="col-md-4">
                                <h5  className="mt-20 mb-14">Parking</h5>
                                <div className="checkbox-view">
                                    {parking_type.map((data, index) => {
                                        return (
                                            <div className='d-flex'>
                                                <Checkbox checked={
                                                    listValues.parking.value.lastIndexOf(String(data.name)) >= 0 ? true : false
                                                } onChange={(e) => handleChange(e, "parking","checkbox", data.id, index + 1)} name={data.name} value={data.name} ><div className='checkbox-Data'>{data.name}</div></Checkbox>
                                                
                                           </div>
                                        )
                                    })}
                                </div>
                                </div>
                                <div className="col-md-4">
                                <h5 className="mt-20 mb-14">Bathroom</h5>
                                <div className="checkbox-view">
                                    {bathroom_type.map((data, index) => {
                                        return (
                                            <div className="d-flex">
                                                <label className="radio-item" key={index}>
                                                    <input 
                                                        type="radio"
                                                        name='bathroom'
                                                        value={listValues.bathroom.value}
                                                        // defaultChecked={index === 0}
                                                        onChange={() => handleChange(data.name, "bathroom","radio",)}
                                                    />
                                                    <span className="checkmark">{data.name}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                                </div>
                                <div className="col-md-4">
                                <h5 className="mt-20 mb-14">Availability</h5>
                                <div className="checkbox-view check_second">
                                    {available.map((data, index) => {
                                        return (
                                            <div className="d-flex">
                                                <label className="radio-item" key={index}>
                                                    <input 
                                                        type="radio"
                                                        name='availability'
                                                        value={listValues.availability.value}
                                                        // defaultChecked={index === 0}
                                                        onChange={() => handleChange(data.name,"availability", "radio")}
                                                    />
                                                    <span className="checkmark">{data.name}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                                </div>
                                <div className="col-md-4">
                                <h5 className="mt-20 mb-14">Amenities</h5>
                                <div className="checkbox-view">
                                    {amenities.map((data, index) => {
                                        return (
                                            <div className='d-flex'>
                                                <Checkbox checked={
                                                    listValues.amenities.value.lastIndexOf(String(data.name)) >= 0 ? true : false
                                                } onChange={(e) => handleChange(e, "amenities", "checkbox", data.id, index + 1)} name={data.name} value={data.name} ><div className='checkbox-Data'>{data.name}</div></Checkbox>
                                                
                                            </div>
                                        )
                                    })}
                                </div>
                                </div>
                                </div>
                                </>
}
                        
                                <div className="alert alert-warning d-none" role="alert">
                                    Please note that the date and time you requested may not be available. We will contact you to confirm your actual appointment details.
                                </div>
                                {Type==="Features" &&
                                <div style={{display:"flex",justifyContent:"center"}}>
                                 <div className="btn-wrapper text-end mt-30"  style={{paddingRight:"20px"}}>
                                    <button className="theme-btn-1 btn btn-block text-uppercase" onClick={()=>ChangeContinue("Details",false)}>Back</button>
                                </div>
                                <div className="btn-wrapper text-center mt-30 mb-15">
                                    <button className="theme-btn-1 btn btn-block text-uppercase"  onClick={()=>Submit_ChangeContinue("features",true,"Media")}>Continue</button>
                                </div>
                                </div>
}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddListing