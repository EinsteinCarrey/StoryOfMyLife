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
        type: Number,
        required: [true, 'Each comment must belong to a user']
    },
    story_id: {
        type: Number,
        required: [true, 'Each comments must belong to a story']
    },
    createdOn:{
        type: Date,
        default: Date.now
    }
});

// Sets the createdAt parameter equal to the current time
CommentsSchema.pre('save', next => {
    const now = new Date();
    if(!this.createdOn) {
        this.createdOn = now;
    }
    next();
});


/* Create a collection called 'comment' */
const Comments = mongoose.model('comment', CommentsSchema);

module.exports = Comments;