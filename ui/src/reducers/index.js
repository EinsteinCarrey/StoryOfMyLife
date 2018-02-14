import {combineReducers} from 'redux';
import users from './users';
import comments from './comments';
import stories from './storiesReducer';

const combinedReducer = combineReducers({
    users,
    comments,
    stories
});


export default combinedReducer;