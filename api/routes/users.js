const express = require('express');
let router = express.Router();
let User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

/* Create a new user */
router.post('/', function (request, response) {

    let user = {};
    const {username, displayName, passwd} = request.body;

    /* Convert username and display to lowercase */
    user.username = username.toLowerCase();
    user.displayName = displayName.toLowerCase();

    /*  If password is not provided or is less than 6 characters long
        respond with error message */
    (!passwd || passwd.length < 6) ?
        response.send({
            errMsg: "Please provide a valid password. It should be more than 5 characters"
        }):

        /* hash the password using bcrypt and save user to DB */
        bcrypt.hash(passwd, 10).then(function (hash) {
            user.passwd = hash;
            let newUser = new User(user);

            /* Save it into the DB. */
            newUser.save().then((output) => {
                response.send(output);
            }).catch((err) => {
                response.send(err);
            });
        });
});


/* Authenticate a user */
router.post('/authenticate', function (request, response) {

    const {username, passwd} = request.body;

    /* find the user by username */
    User.findOne({
        username: username.toLowerCase()
    }).then((userFound)=>{

        /* User not found, respond with error message */
        !userFound ? response.status(401).send({error: `user '${username}' not found`}):

            /* Check if password is valid */
            bcrypt.compare(passwd, userFound.passwd).then(function (passwordIsAuthentic) {

                /* Password is not correct */
                if(!passwordIsAuthentic) {
                    response.status(401).send({error: `Password is incorrect`})
                }else {

                    /* Create web token */
                    const token = jwt.sign(
                        {userId: userFound._id},
                        process.env.SECRET_KEY,
                        {expiresIn: '1 day'}
                    );
                    /* Return auth token with user's display name */
                    response.send({
                        token: token,
                        displayName: userFound.displayName
                    });
                }
            });

    }).catch((err)=>{
        console.log(err);
        response.send({error: err});
    });
});

module.exports = router;