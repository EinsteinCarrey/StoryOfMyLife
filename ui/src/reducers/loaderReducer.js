import {START_LOADER, DISPLAY_ERROR_MSG} from "../actions/actionTypes";

const initialState = false;


const actionTypeEndsWithSuccess = (type) => {
    return type.substring(type.length - 8) === '_SUCCESS';
};

export default function loaderReducer(state = initialState, action){

    /* Check if async call completed successfully */
    if(actionTypeEndsWithSuccess(action.type)) return false;

    switch (action.type) {
        case START_LOADER:
            return true;
        case DISPLAY_ERROR_MSG:
            return false;
        default:
            return state;
    }
}
