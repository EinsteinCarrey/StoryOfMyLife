import {FETCH_COMMENTS_SUCCESS} from "../actions/actionTypes";

const initialState = [];

export default function storiesReducer(state = initialState, action){
    switch (action.type) {
        case FETCH_COMMENTS_SUCCESS:
            return action.comments;
        default:
            return state;
    }
}