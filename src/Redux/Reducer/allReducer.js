import {
     PROPERTY_SEARCH,VIEW_SERVICE_CART,VIEW_HOME_LIST,GET_AMINITIES 
} from '../Utils/constant';
const initialValues={
    Property_list:[],
    Service_Cart:[],
    HomeList:[],
    Aminities:[]
}
export default function (state = initialValues, action) {
    const { type, payload } = action;
    switch (type) {
        case PROPERTY_SEARCH:
            return { ...state, Property_list: payload }
        case VIEW_SERVICE_CART:
            return { ...state, Service_Cart: payload }
        case VIEW_HOME_LIST:
             return { ...state, HomeList: payload }  
        case GET_AMINITIES:
             return { ...state, Aminities: payload }   
        default:
            return state;
    }
};