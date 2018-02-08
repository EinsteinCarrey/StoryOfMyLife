const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Define comments schema
 */
const commentsSchema = new Schema({
    comment: {
        type: String,
        required: [true, 'Comment must be provided']
    },
    user: {
        type: Number,
        required: [true, 'Each comment must belong to a user']
    },
    story_id: {
        type: Number,
        required: [true, 'Each comments must belong to a story']
    }
});

/* Create a collection called 'comment' */
const Comments = mongoose.model('comment', commentsSchema);

module.exports = Comments;