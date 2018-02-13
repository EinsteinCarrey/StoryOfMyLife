const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sha256 = require('sha256');

/*
 * Define users schema
 */
const UserSchema = new Schema({
    displayName: {
        type: String,
        unique: [true, 'DisplayName is already in use. Please provide a unique DisplayName'],
        required: [true, 'DisplayName must be provided']
    },username: {
        type: String,
        unique: [true, 'Username is already in use. Please provide a unique username'],
        required: [true, 'Username must be provided']
    },
    passwd: {
        type: String,
        minLength: [6, 'Password must be atleast 6 characters long'],
        required: [true, 'Password must be provided']
    }
});

/* Hash password before saving to DB */
UserSchema.pre("save", function (next) {
    // store reference
    const user = this;

    //Check if password is provided
    if (!user.passwd) {
        console.log('not provided');
        return next();
    }
    // Convert username and display to lowercase
    user.username = user.username.toLowerCase();
    user.displayName = user.displayName.toLowerCase();

    // hash the password using sha1
    user.passwd = sha256(user.passwd);

    next();
});

/* Create a collection called 'users' */
const User = mongoose.model('user', UserSchema);

module.exports = User;