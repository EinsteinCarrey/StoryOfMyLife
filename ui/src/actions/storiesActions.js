import * as actionTypes from './actionTypes';
import fetchFromApi from "../apiHandler";

const displayErrorMessage = (err) =>{
    console.log(err);
    return {type: actionTypes.ERROR_MSG_DISPLAYED}
};

export const fetchStories = (storyID = null) =>{

    return function (dispatch) {

        fetchFromApi("get").then((outPut) => {
            dispatch({
                type: actionTypes.FETCH_STORIES,
                stories: outPut
            });
        }).catch((err) => {
            dispatch(displayErrorMessage(err));
        });
    }

};