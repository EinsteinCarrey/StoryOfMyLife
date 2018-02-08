const express = require('express');
let router = express.Router();
let User = require('../models/users');

/* Create a new user */
router.post('/', function (request, response) {
    /* Create a user */
    let newUser = new User(request.body);

    /* Save it into the DB. */
    newUser.save().then((output)=>{
        response.send(output);
    }).catch((err)=>{
        response.send(err);
    });
});


module.exports = router;