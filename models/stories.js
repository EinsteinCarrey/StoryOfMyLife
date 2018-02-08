const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Define stories schema
 */
const StoriesSchema = new Schema({
    story: {
        type: String,
        minLength: 50,
        required: [true, 'story must be provided']
    },
    user: {
        type: Number,
        required: [true, 'Story must belong to a user']
    },
    createdOn:{
        type: Date,
        default: Date.now
    }
});

// Sets the createdAt parameter equal to the current time
StoriesSchema.pre('save', next => {
    const now = new Date();
    if(!this.createdOn) {
        this.createdOn = now;
    }
    next();
});


/* Create a collection called 'stories' */
const Stories = mongoose.model('storie', StoriesSchema);

module.exports = Stories;