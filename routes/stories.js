const express = require('express');
let router = express.Router();
let Story = require('../models/stories');

/* Create a new story */
router.post('/', function (request, response) {
    /* Get current user */
    const userID = request.decoded.userId;
    request.body.user = userID;

    // Create story
    let newStory = new Story(request.body);

    /* Save it to the DB. */
    newStory.save().then((output)=>{
        response.send(output);
    }).catch((err)=>{
        response.send(err);
    });

});

/* GET home page. */
router.delete('/', function (request, response) {
    response.send({title: 'delete'});
});

/* GET home page. */
router.put('/', function (request, response) {
    response.send({title: 'put'});
});

module.exports = router;
