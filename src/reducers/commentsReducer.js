import {FETCH_COMMENTS_SUCCESS, CREATE_COMMENTS_SUCCESS} from "../actions/actionTypes";

const initialState = [];

export default function storiesReducer(state = initialState, action){
    switch (action.type) {
        case FETCH_COMMENTS_SUCCESS:
            return action.comments;
        case CREATE_COMMENTS_SUCCESS:
            const allComments = state;
            allComments.push(action.comment);
            return allComments;
        default:
            return state;
    }
}