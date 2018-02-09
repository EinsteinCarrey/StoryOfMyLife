const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Define stories schema
 */
const StoriesSchema = new Schema({
    title: {
        type: String,
        maxLength: 40,
        unique: [true, `Title must be unique`],
        required: [true, 'Story must have a title']
    },referenceSlug: {
        type: String,
        maxLength: 200
    },story: {
        type: String,
        minLength: 50,
        required: [true, 'story must be provided']
    },
    user: {
        type: String,
        required: [true, 'Story must belong to a user']
    },
    createdOn:{
        type: Date,
        default: Date.now
    }
});

/* Create a collection called 'stories' */
const Stories = mongoose.model('storie', StoriesSchema);

module.exports = Stories;