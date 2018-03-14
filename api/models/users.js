const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
 * Define users schema
 */
const UserSchema = new Schema({
    displayName: {
        type: String,
        unique: [true, "DisplayName is already in use. Please provide a unique DisplayName"],
        required: [true, "DisplayName must be provided"]
    },username: {
        type: String,
        unique: [true, "Username is already in use. Please provide a unique username"],
        required: [true, "Username must be provided"]
    },
    passwd: {
        type: String,
        minLength: [6, "Password must be atleast 6 characters long"],
        required: [true, "Password must be provided"]
    }
});

/* Create a collection called "users" */
const User = mongoose.model("user", UserSchema);

module.exports = User;