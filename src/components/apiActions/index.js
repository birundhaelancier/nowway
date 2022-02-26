import moment from "moment";
import { APIURL, REQUEST_HEADERS } from "./baseHeaders";
import axios from 'axios';
import CryptoJS from 'crypto-js'
import { notification } from 'antd'

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

export const GetPropertyType = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "property_type", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetLocations = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "locations", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetStructureType = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "structure_type", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const onLogin = (values) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "mobile": values.mobile, "password": values.password
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "cuslogin", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const onRegister = (values) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "name": values.name, "mobile": values.mobile, "email": values.email, "password": values.password
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription })
        };
        return fetch(APIURL + "cusregister", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetOtp = (values) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "mobile": values.mobile
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "verifyotp", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetAmenities = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "amenities", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetFaqDetails = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "faq", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetServiceDetails = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "services", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetRooms = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "rooms", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetBHKType = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "bhk_type", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetPreferredTenants = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "preferred_tenants", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetFurnishing = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "furnishing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetParking = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "parking", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetBathroom = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "bathroom", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetAvailability = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "availability", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetSubService = (values) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "service_id": values
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "sub_services", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const AddSubServiceEnquiry = (values, name) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "login_id": JSON.parse(localStorage.getItem("user_id")), "name": values.name, "mobile": values.mobile, "place": values.place, "service": name,
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "add_service_enquiry", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const SearchListing = (values) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "property_type": "", "amenities": "", "from_price": "", "to_price": "", "bedrooms": "", "type": "", "bathrooms": "", "user_id": "0", "search": "t", "city": ""
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "search_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const InsertListing = (list, checkList) => {
    try {
        const Encription = CryptoJS.AES.encrypt(
            JSON.stringify({ "user_id": JSON.parse(localStorage.getItem("user_id")), "title": list.title, "description": list.description, "price": list.price, "after_price": list.afterPrice, "before_price": list.beforePrice, "yearly_tax": list.yearlyTax, "owner_associ_fee": list.ownerFee, "property_type": list.propertyType, "type": list.types, "images": "", "address": list.address, "city": list.city, "state": list.state, "country": list.country, "neighbourhood": list.neighbourhood, "zip": list.zipCode, "size": list.size, "lot_size": list.lotSize, "rooms": list.rooms, "bedrooms": list.bedRooms, "bathrooms": list.bathrooms, "garges": list.garges, "year_built": list.yearBuilt, "garage_size": list.garageSize, "basement": list.basement, "available_from": list.availableFrom, "extra_details": list.extra_details, "roofing": list.roofing, "exterior_material": list.exteriorMaterial, "structure_type": list.structureType, "floors": list.floors, "owner_note": list.owner_note, "bhk_type": list.bhk_type, "tenants": list.tenants.toString(), "furnishing": list.furnishing.toString(), "parking": list.parking.toString(), "bathroom": list.bathroom, "availability": list.availability, "amenities": list.amenities.toString() })
            , '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "add_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetProductDetails = (values) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "property_id": values
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        console.log(decryptValue(Encription),"gggggggggggg")
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "get_property", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetHomeOffer = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "home_offers", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetHomeList = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
        };
        return fetch(APIURL + "home_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetUserDetails = () => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id"))
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "get_user", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const UpdateUserDetails = (userDetails, picture, show_PasswordInput) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id")), "first_name": userDetails.fname, "last_name": userDetails.lname, "password": show_PasswordInput ? userDetails.newPassword : userDetails.curPassword, "email": userDetails.email, "display_name": userDetails.name, "description": userDetails.description, "image": picture, "profession": userDetails.profession
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        console.log(decryptValue(Encription), "decryptValue")
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "update_user", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetRelatedProducts = (values) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "property_id": values
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: REQUEST_HEADERS,
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "related_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

