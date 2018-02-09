const express = require('express');
let router = express.Router();
let Story = require('../models/stories');
const slug = require('slug');
const now = new Date();

/* Create a new story */
router.post('/', (request, response) =>{
    /* Get current user */
    const userID = request.decoded.userId;
    request.body.user = userID;
    request.body.createdOn = now.toDateString();
    request.body.referenceSlug = slug(request.body.title);

    // Create story
    let newStory = new Story(request.body);

    /* Save it to the DB. */
    newStory.save().then((output)=>{
        response.send(output);
    }).catch((err)=>{
        response.send(err);
    });
});


/* Update a story */
router.put('/:referenceSlug', (request, response) =>{

    const key = {referenceSlug : request.params.referenceSlug};

    const updatedStory = {
        referenceSlug: slug(request.body.title),
        title: request.body.title,
        story: request.body.story,
        createdOn: now.toDateString()
    };
    Story.update(key, updatedStory).then((output) => {
        response.send(output);
    }).catch((err)=>{
        response.send({errMsg: err});
    });
});

/* Delete a story */
router.delete('/:referenceSlug', (request, response) =>{
    const key = {referenceSlug : request.params.referenceSlug};

    Story.remove(key).then((output) => {
        let message;
        output.n > 0? message = "Story has been deleted" : message = "This story does not exists";
        response.send({
            message: message
        });
    }).catch((err)=>{
        response.send({errMsg: err});
    });
});


module.exports = router;
