import {FETCH_STORIES_SUCCESS} from "../actions/actionTypes";

const initialState = [];

export default function storiesReducer(state = initialState, action){
    switch (action.type) {
        case FETCH_STORIES_SUCCESS:
            return action.stories;
        default:
            return state;
    }
}
