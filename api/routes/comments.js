const helper = require("./helperMethods");
const express = require('express');
let router = express.Router();
let Comment = require('../models/comments');
const now = new Date();

/* Create a new comment on a story */
router.get('/', (request, response) =>{

    /* Set story slug as key */
    const key = {storyRef: request.originalUrl.getTextBetween("/")};

    /* Save it to the DB. */
    Comment.find(key).then((output)=>{
        response.send(output);
    }).catch((err)=>{
        response.send(err);
    });
});

/* Create a new comment on a story */
router.post('/', helper.verifyUser, helper.verifyUser, (request, response) =>{
    /* Get current user */
    request.body.user = request.decoded.userId;

    /* Get current timestamp */
    request.body.createdOn = now.toDateString();

    /* Get story slug */
    request.body.storyRef = request.originalUrl.getTextBetween("/");

    /* Create comment */
    let newComment = new Comment(request.body);

    /* Save it to the DB. */
    newComment.save().then((output)=>{
        response.send(output);
    }).catch((err)=>{
        response.send(err);
    });
});

/* Update a comment */
router.put('/:commentID', helper.verifyUser, (request, response) =>{

    /* Get current user */
    const user = request.decoded.userId;
    const key = {
        user,
        _id : request.params.commentID,
        storyRef: request.originalUrl.getTextBetween("/")
    };

    const updatedComment = {
        comment: request.body.comment,
        createdOn: now.toDateString()
    };

    Comment.update(key, updatedComment).then((output) => {
        response.send(output);
    }).catch((err)=>{
        response.send({errMsg: err});
    });
});

/* Delete a comment */
router.delete('/:commentID', helper.verifyUser, (request, response) =>{

    /* Get current user */
    const user = request.decoded.userId;

    const key = {
        user,
        _id : request.params.commentID,
    };

    Comment.remove(key).then((output) => {
        let message;
        output.n > 0? message = "Comment has been deleted" : message = "Comment does not exists";
        response.send({
            message: message
        });
    }).catch((err)=>{
        response.send({errMsg: err});
    });
});


module.exports = router;
