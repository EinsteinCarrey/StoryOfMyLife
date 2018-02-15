const helper = require("./helperMethods");
const express = require("express");
let router = express.Router();
let Comment = require("../models/comments");
const now = new Date();

/* Create a new comment on a story */
router.get("/", (request, response) =>{

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
router.post("/", helper.verifyUser, helper.verifyUser, (request, response) =>{
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
        response.status(201).send(output);
    }).catch((err)=>{
        response.send(err);
    });
});

/* Update a comment */
router.put("/:commentID", helper.verifyUser, (request, response) =>{

    /* Get current user */
    const user = request.decoded.userId;
    const key = {
        user,
        _id : request.params.commentID
    };

    const updatedComment = {
        comment: request.body.comment,
        createdOn: now.toDateString()
    };

    Comment.update(key, updatedComment).then((output) => {
        output.n > 0 ? response.send({msg: "comment updated successfully"}) :
            response.status(404).send({errMsg: "You tried updating a comment that doesn't exist"});
    }).catch((err)=>{
        response.send({errMsg: err});
    });
});

/* Delete a comment */
router.delete("/:commentID", helper.verifyUser, (request, response) =>{

    /* Get current user */
    const user = request.decoded.userId;

    const key = {
        user,
        _id : request.params.commentID,
    };

    Comment.remove(key).then((output) => {
        let msg;
        output.n > 0 ? response.send({msg:"Comment has been deleted"}) :
            response.status(404).send({msg: "You tried deleting a comment that doesn't exists"});

    }).catch((err)=>{
        response.send({errMsg: err});
    });
});


module.exports = router;
