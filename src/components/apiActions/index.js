import moment from "moment";
import { APIURL} from "./baseHeaders";
import axios from 'axios';
import CryptoJS from 'crypto-js'
import { notification } from 'antd'
import { VIEW_HOME_LIST } from '../../Redux/Utils/constant'

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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "structure_type", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const onLogin = (values,type,token) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "mobile": values.mobile, "password": values.password || "",type:type
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method:'POST',
            headers:{"Authorization": 'Bearer' + token},
            body: JSON.stringify({ encrypted: Encription }),
        };
       console.log(decryptValue(Encription))
        return fetch(APIURL + "cuslogin", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const onRegister = (values,userid) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "name": values.name, "mobile": values.mobile, "email": values.email,"user_id":userid || 0,"password":values.password
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        console.log(decryptValue(Encription))
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription })
        };
        return fetch(APIURL + "cusregister", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetOtp = (values,type) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "mobile": values.mobile,
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method:'POST',
            headers:{"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers:{"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            "email":values.email,"inspect_date":moment(values.date).format("YYYY-MM-DD"),"time_slot":values.time,"address":values.address,"pincode":values.pincode
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "search_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const InsertListing = (list, checkList,Type,property_id) => {
    var Location=new FormData()
    var Details=new FormData()
    var Media=new FormData()
    var Features=new FormData()
    Location.set("user_id",JSON.parse(localStorage.getItem("user_id")))
    Location.set("city",list.city.value)
    Location.set("property_type",list.types.value)
    Location.set("type",list.propertyType.value)
    Location.set("ptype",Type)
    Location.set("property_id",property_id || 0)

    Details.set("user_id",JSON.parse(localStorage.getItem("user_id")))
    Details.set("bhk_type",list.bhk_type.value)
    Details.set("floors",list.floors.value)
    Details.set("price",list.price.value)
    Details.set("ptype",Type)
    Details.set("property_id",property_id || 0)
    Details.set("monthly_maintain",list.maintenance.value)
    Details.set("sq_ft",list.size.value)
    Details.set("negotiate",list.negotiate.value)
    Details.set("address",list.address.value)
    Details.set("facing",list.facing.value)
    Details.set("description",list.description.value)
    Details.set("advance_amount",list.advance.value)
    Media.set("user_id",JSON.parse(localStorage.getItem("user_id")))
    checkList.length>0? 
    checkList.forEach(image => {
        // console.log("fghj",image)
        Media.append("images"+"[]",image.originFileObj || "")
    })
    : Media.append("images"+"[]","")
    Media.set("ptype",Type)
    Media.set("property_id",property_id || 0)

    Features.set("user_id",JSON.parse(localStorage.getItem("user_id")))
    Features.set("ptype",Type)
    Features.set("property_id",property_id || 0)
    Features.set("tenants",list.tenants.value.toString())
    Features.set("furnishing",list.furnishing.value.toString())
    Features.set("parking",list.parking.value.toString())
    Features.set("bathroom", list.bathroom.value)
    Features.set("availability", list.availability.value)
    Features.set("amenities", list.amenities.value.toString())
   

    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: Type==="Details"?Details:Type==="Media"?Media:Type==="Features"?Features:Location,
        };
        console.log("reeeee",Details)

        return fetch(APIURL + "add_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)

            });
    } catch (err) { }

}




export const GetProductDetails = (values,type) => {
    let Url=type==="own"?"get_my_property":"get_property"
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "property_id": values, "user_id": JSON.parse(localStorage.getItem("user_id")) || 0
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers:{"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + Url, requestOptions)
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "home_offers", requestOptions)
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
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
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "related_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const Top_Categories = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "top_property_type", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const Add_ContactDetails = (property_id) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id")), "property_id": property_id
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "add_contacted", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const Add_WishList = (property_id) => {
    const Encription = CryptoJS.AES.encrypt(JSON.stringify({
        "user_id": JSON.parse(localStorage.getItem("user_id")), "property_id": property_id
    }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "add_wishlist", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetMyList = () => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id"))
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "my_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetContachDetails = () => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id"))
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "contacted_list", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetWishlist = () => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id"))
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "wish_list", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const RemoveWishlist = (id) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id")), "property_id": id
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "remove_wishlist", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const AddPropertyview = (property_id) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id")) || 0, "property_id": property_id
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        console.log(decryptValue(Encription), "yy")
        return fetch(APIURL + "add_view_property", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetPolicy = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "policy", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetTerms = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "terms", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetWalletList = () => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id"))
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        console.log(decryptValue(Encription), "Encription")
        return fetch(APIURL + "wallet_list", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const FeedBacklist = () => {
    try {
       
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "feedback", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const PropertyReportIssue = (id,value) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id":JSON.parse(localStorage.getItem("user_id")),"property_id":id,"issue":value
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {

            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "report_issue", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const Refund_list = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "refund", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const FooterTags = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "footer_tags", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetServiceEnquiry = () => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id"))
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        console.log("dddddddddddddd",Encription)
        return fetch(APIURL + "enquiry_list", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const GetTime_Slot = () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
        };
        return fetch(APIURL + "time_slot", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const GetListings_Data = () => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("user_id"))
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "get_listing", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

export const ServiceProducts = (id) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "service_id": id
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "service_products", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}


export const AddService_Cart = (qty,data) => {
    try {
        const Encription = CryptoJS.AES.encrypt(JSON.stringify({
            "user_id":JSON.parse(localStorage.getItem("user_id")),"pid":data.id,"price":data.price,"qty":qty || 1
        }), '$2y$10$NDJ8GvTAdoJ/uG0AQ2Y.9ucXwjy75NVf.VgFnSZDSakRRvrEyAlMq', { format: CryptoJSAesJson }).toString();
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": 'Bearer' + JSON.parse(localStorage.getItem("Token"))},
            body: JSON.stringify({ encrypted: Encription }),
        };
        return fetch(APIURL + "add_service_cart", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                return decryptValue(response.encrypted)
            });
    } catch (err) { }
}

