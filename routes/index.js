const express = require('express');
let router = express.Router();
let Stories = require('../models/stories');

/* List all stories */
router.get('/', function (request, response) {

    //Query the DB and if no errors, retrieve all the stories
    let query = Stories.find({});
    query.exec().then((output)=>{
        response.send(output);
    }).catch((err)=>{
        response.send({error: err});
    });
});


module.exports = router;