import {combineReducers} from 'redux';
import user from './usersReducer';
import comments from './commentsReducer';
import stories from './storiesReducer';
import loading from './loaderReducer';

const combinedReducer = combineReducers({
    user,
    comments,
    stories,
    loading
});


export default combinedReducer;