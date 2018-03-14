import {AUTHENTICATE_USER_SUCCESS} from "../actions/actionTypes";

const initialState = {displayName: localStorage.getItem("displayName")};


export default function loaderReducer(state = initialState, action){

    switch (action.type) {
        case AUTHENTICATE_USER_SUCCESS:
            return {displayName: action.displayName};
        default:
            return state;
    }
}
