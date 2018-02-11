const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Define comments schema
 */
const CommentsSchema = new Schema({
    comment: {
        type: String,
        required: [true, 'Comment must be provided']
    },
    user: {
        type: String,
        required: [true, 'Each comment must belong to a user']
    },
    storyRef: {
        type: String,
        required: [true, 'Each comments must belong to a story']
    },
    createdOn:{
        type: String,
        default: Date.now
    }
});


/* Create a collection called 'comment' */
const Comments = mongoose.model('comment', CommentsSchema);

module.exports = Comments;