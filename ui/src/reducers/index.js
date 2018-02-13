import {combineReducers} from 'redux';
import users from './users';
import comments from './comments';
import stories from './stories';

const combinedReducer = combineReducers({
    users,
    comments,
    stories
});


export default combinedReducer;