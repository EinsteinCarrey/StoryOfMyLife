import {combineReducers} from 'redux';
import users from './usersReducer';
import comments from './commentsReducer';
import stories from './storiesReducer';
import loading from './loaderReducer';

const combinedReducer = combineReducers({
    users,
    comments,
    stories,
    loading
});


export default combinedReducer;