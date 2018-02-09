const express = require('express');
let router = express.Router();
let User = require('../models/users');
const sha1 = require('sha1');
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

/* Create a new user */
router.post('/', function (request, response) {
    let newUser = new User(request.body);

    /* Save it into the DB. */
    newUser.save().then((output)=>{
        response.send(output);
    }).catch((err)=>{
        response.send(err);
    });
});


/* Authenticate a user */
router.post('/authenticate', function (request, response) {

    const username = request.body.username;
    const passwd = request.body.passwd;

    // find the user
    User.findOne({
        username: username.toLowerCase()
    }).then((userFound)=>{

        /* User not found */
        if(!userFound){
            return response.status(401).send({error: `user '${username}' not found`});
        }

        /* Password is not correct */
        if(userFound.passwd !== sha1(passwd)){
            return response.status(401).send({error: `Password is incorrect`});
        }

        /* Create web token */
        const token = jwt.sign(
            {userId:userFound._id},
            process.env.SECRET_KEY,
            { expiresIn: '1 day'}
        );

        response.send({
            token: token,
            displayName: userFound.displayName
        });

    }).catch((err)=>{
        response.send({error: err});
    });

});

module.exports = router;