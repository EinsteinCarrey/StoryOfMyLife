import {combineReducers} from 'redux';
import users from './users';
import comments from './comments';
import stories from './storiesReducer';
import loading from './loaderReducer';

const combinedReducer = combineReducers({
    users,
    comments,
    stories,
    loading
});


export default combinedReducer;