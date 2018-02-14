import {FETCH_STORIES} from "../actions/actionTypes";

const initialState = [];

export default function storiesReducer(state = initialState, action){
    switch (action.type) {
        case FETCH_STORIES:
            return action.stories;
        default:
            return state;
    }
}
