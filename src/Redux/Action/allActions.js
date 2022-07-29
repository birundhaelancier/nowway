import {
    PROPERTY_SEARCH,
    VIEW_SERVICE_CART,
    ADD_CART_LIST,
    GET_AMINITIES,VIEW_HOME_LIST,
    GET_SEO_LIST
} from '../Utils/constant';
import { APIURL } from "../../components/apiActions/baseHeaders";
import CryptoJS from 'crypto-js'
import { notification } from 'antd'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
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

const mypass = "$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq"

const decryptValue = (data) => {
    var res = JSON.parse(CryptoJS.AES.decrypt(data, mypass, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8));
    return res
}



export const GetPropertyType_Search= (data,Search) => async dispatch =>{
    let Amenities=data?.Amenities?.toString()
    const Encription = CryptoJS.AES.encrypt(JSON.stringify({
    "property_type":data?.Property_Type  || data?.property?.toString() || "","amenities":Amenities || "","from_price":data?.PriceRange?.from || "","to_price":data?.PriceRange?.to || "","bedrooms":data?.Bed_Bath?.toString() || "","type":data?.Category || "","bathrooms":data?.Bathrooms?.toString() || "","user_id": 0,"search":Search || "","city":data?.city || ""
    }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
    console.log(decryptValue(Encription))
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "search_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                dispatch({
                    type: PROPERTY_SEARCH,
                    payload: decryptValue(response.encrypted)
                })
            });
    } catch (err) { }
}


export const ViewService_Cart= () => async dispatch =>{
    const Encription = CryptoJS.AES.encrypt(JSON.stringify({
        "user_id":JSON.parse(localStorage.getItem("user_id"))
    }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "view_service_cart", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                dispatch({
                    type: VIEW_SERVICE_CART,
                    payload: decryptValue(response.encrypted)
                })
            });
    } catch (err) { }
}


export const  Remove_Service_Cart= (id) => async (dispatch) => {
    const Encription = CryptoJS.AES.encrypt(JSON.stringify({
        "user_id":JSON.parse(localStorage.getItem("user_id")),pid:id
    }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
    try {
        axios({
            method: 'post',
            headers:{"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            url: APIURL + 'delete_service_cart',
            data:JSON.stringify({encrypted:Encription})
        })
        .then((response) => {
            const Res=decryptValue(response.data.encrypted)
            if (Res.Status === "Success") {
                Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: Res.Message,
				})
                dispatch(ViewService_Cart())
            } else {
                Swal.fire({
					title: 'Failed!',
					icon: 'error',
					text: Res.Message,
				})
            }
            return Promise.resolve();
        })
        
    } catch (err) {
        Swal.fire({
            title: 'Failed!',
            icon: 'error',
            text:"Something went wrong details not Deleted",
        })
    }
}



export const AddService_Cart = (data,qty) => async (dispatch) =>  {

    const Encription = CryptoJS.AES.encrypt(JSON.stringify({
        "user_id":JSON.parse(localStorage.getItem("user_id")),"pid":data.pid?data.pid:data.id,"price":data.price,"qty":qty || 1
    }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
    console.log(decryptValue(Encription),"dfghjdsfghjfdgh")
    try {
        axios({
            method: 'post',
            headers:{"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            url: APIURL + 'add_service_cart',
            data:JSON.stringify({encrypted:Encription})
        })
        .then((response) => {
            const Res=decryptValue(response.data.encrypted)
            if (Res.Status === "Success") {
                Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: Res.Message,
				})
                dispatch(ViewService_Cart())
            } else {
                Swal.fire({
					title: 'Failed!',
					icon: 'error',
					text: Res.Message,
				})
            }
            return Promise.resolve();
        })
        
    } catch (err) {
        Swal.fire({
            title: 'Failed!',
            icon: 'error',
            text:"Something went wrong details not Added",
        })
    }
}


    export const PaymentSuccess = (values,cartdet,ser_id,pay_id,status) => async (dispatch) =>  {

     var ArrayData=[]
     cartdet && cartdet.details.forEach((data,index) => {
        ArrayData.push({"pid":data.pid,"price":data.price,"qty":data.qty,"nwcash":data.product_nwcash})
     })   
    const Encription = CryptoJS.AES.encrypt(JSON.stringify({
    "login_id": JSON.parse(localStorage.getItem("user_id")), "name": values.name, "mobile": values.mobile, "place": values.place, "service":ser_id,
    "email":values.email,"inspect_date":moment(values.date).format("YYYY-MM-DD"),"time_slot":values.time,"address":values.address,"pincode":values.pincode,
    "total_qty":cartdet.total_qty,"sub_total":cartdet.sub_total,"total_nw":cartdet.nwcash,"total":cartdet.total,"payment_id":pay_id,"payment_mode":"Razorpay","payment_status":status,"conv_charge":cartdet.conv_charge || "",
    "details":ArrayData
    }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();

    try {
        axios({
            method: 'post',
            headers:{"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            url: APIURL + 'save_enquiry',
            data:JSON.stringify({encrypted:Encription})
        })
        .then((response) => {
            const Res=decryptValue(response.data.encrypted)
            if (Res.Status === "Success") {
                Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: Res.Message,
				})
                dispatch(ViewService_Cart())
            } else {
                Swal.fire({
					title: 'Failed!',
					icon: 'error',
					text: Res.Message,
				})
            }
            return Promise.resolve();
        })
        
    } catch (err) {
        Swal.fire({
            title: 'Failed!',
            icon: 'error',
            text:"Something went wrong",
        })
    }
}



export const GetAmenities = () => async (dispatch)=> {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "amenities", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                dispatch({
                    type: GET_AMINITIES,
                    payload: decryptValue(response.encrypted)
                })
            });
    } catch (err) { }
}


export const GetHomeList = () => async (dispatch)=> {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id")) ? JSON.parse(localStorage.getItem("user_id")) : 0
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers:{"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "home_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                dispatch({
                    type: VIEW_HOME_LIST,
                    payload: decryptValue(response.encrypted)
                })
            });
    } catch (err) { }
}



export const GetSeo_list = () => async (dispatch)=> {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "seo_list", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                dispatch({
                    type: GET_SEO_LIST,
                    payload: decryptValue(response.encrypted)
                })
            });
    } catch (err) { }
}




export const Visit_OurPages = (name,service_id,product_name) => async dispatch => {
    try {
        axios({
            method: 'post',
            url:"https://nowway.in:3000/metaData",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                
            },
            data:JSON.stringify({
                "page":"home",
                "serviceId":service_id || "",
                "product":product_name || ""     
            }),
        })
        .then((response) => {
         
        })
        
    } catch (err) {
    }
}