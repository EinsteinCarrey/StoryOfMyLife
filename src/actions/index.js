import * as actionTypes from './actionTypes';
import fetchFromApi from "../apiHandler";

const displayErrorMessage = (err) =>{
    console.log(err);
    return {type: actionTypes.DISPLAY_ERROR_MSG}
};

export const fetchStories = (storyRef = null) =>{

    return function (dispatch) {

        /* display loader */
        dispatch({type: actionTypes.START_LOADER});

        fetchFromApi("get", storyRef).then((outPut) => {
            dispatch({
                type: actionTypes.FETCH_STORIES_SUCCESS,
                stories: outPut
            });
        }).catch((err) => {
            dispatch(displayErrorMessage(err));
        });
    }

};

export const fetchComments = (storyRef) =>{

    return function (dispatch) {

        /* display loader */
        dispatch({type: actionTypes.START_LOADER});

        fetchFromApi("get", storyRef+"/comment").then((outPut) => {
            dispatch({
                type: actionTypes.FETCH_COMMENTS_SUCCESS,
                comments: outPut
            });
        }).catch((err) => {
            dispatch(displayErrorMessage(err));
        });
    }

};

export const createComment = (storyRef, comment) =>{

    return function (dispatch) {

        /* display loader */
        dispatch({type: actionTypes.START_LOADER});

        fetchFromApi("post", storyRef+"/comment", comment).then((outPut) => {
            dispatch({
                type: actionTypes.CREATE_COMMENTS_SUCCESS,
                comment: outPut
            });
        }).catch((err) => {
            dispatch(displayErrorMessage(err));
        });
    }

};

export const authenticateUser = (endpoint, userData) =>{
    return function (dispatch) {

        /* display loader */
        dispatch({type: actionTypes.START_LOADER});

        fetchFromApi("post", endpoint, userData).then((outPut) => {
            /* Set token in localStorage */
            localStorage.setItem("token", outPut.token);
            localStorage.setItem("displayName", outPut.displayName);

            dispatch({
                type: actionTypes.AUTHENTICATE_USER_SUCCESS,
                displayName: outPut.displayName
            });
        }).catch((err) => {
            dispatch(displayErrorMessage(err));
        });
    }
};