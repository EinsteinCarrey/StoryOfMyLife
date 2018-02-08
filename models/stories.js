const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Define stories schema
 */
const storiesSchema = new Schema({
    story: {
        type: String,
        minLength: 50,
        required: [true, 'story must be provided']
    },
    user: {
        type: Number,
        required: [true, 'Story must belong to a user']
    }
});

/* Create a collection called 'stories' */
const Stories = mongoose.model('storie', storiesSchema);

module.exports = Stories;