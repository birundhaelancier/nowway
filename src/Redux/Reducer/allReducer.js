import {
     PROPERTY_SEARCH,VIEW_SERVICE_CART 
} from '../Utils/constant';
const initialValues={
    Property_list:[],
    Service_Cart:[]
}
export default function (state = initialValues, action) {
    const { type, payload } = action;
    switch (type) {
        case PROPERTY_SEARCH:
            return { ...state, Property_list: payload }
        case VIEW_SERVICE_CART:
            return { ...state, Service_Cart: payload }
        default:
            return state;
    }
};