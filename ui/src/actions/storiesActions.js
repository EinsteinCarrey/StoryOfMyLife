import * as actionTypes from './actionTypes';
import fetchFromApi from "../apiHandler";

const displayErrorMessage = (err) =>{
    console.log(err);
    return {type: actionTypes.DISPLAY_ERROR_MSG}
};

export const fetchStories = (storyID = null) =>{

    return function (dispatch) {

        /* display loader */
        dispatch({type: actionTypes.START_LOADER});

        setTimeout(()=>{

            fetchFromApi("get").then((outPut) => {
                dispatch({
                    type: actionTypes.FETCH_STORIES_SUCCESS,
                    stories: outPut
                });
            }).catch((err) => {
                dispatch(displayErrorMessage(err));
            });

        }, 2000);
    }

};