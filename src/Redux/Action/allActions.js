import {
    PROPERTY_SEARCH,
  
} from '../Utils/constant';
import { APIURL, REQUEST_HEADERS } from "../../components/apiActions/baseHeaders";
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

const mypass = "$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq"

const decryptValue = (data) => {
    var res = JSON.parse(CryptoJS.AES.decrypt(data, mypass, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8));
    return res
}



export const GetPropertyType_Search= (data,type,Search) => async dispatch =>{
    let Amenities=data?.Amenities?.toString()
    const Encription = CryptoJS.AES.encrypt(JSON.stringify({
        "property_type":data?.Property_Type  || data?.property?.toString() || "","amenities":Amenities || "","from_price":data?.PriceRange?.from || "","to_price":data?.PriceRange?.to || "","bedrooms":data?.Bed_Bath?.toString() || "","type":type || data?.Category?.toString() || "","bathrooms":data?.Bathrooms?.toString() || "","user_id":0,"search":Search || "","city":data?.Location || ""
    }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
    console.log("checkddddddddddddddddddddd",decryptValue(Encription))
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
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