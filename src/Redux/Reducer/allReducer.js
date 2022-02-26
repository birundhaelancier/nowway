import { PROPERTY_SEARCH } from '../Utils/constant';
const initialValues={
    Property_list:[]
}
export default function (state = initialValues, action) {
    const { type, payload } = action;
    switch (type) {
        case PROPERTY_SEARCH:
            return { ...state, Property_list: payload }
        default:
            return state;
    }
};