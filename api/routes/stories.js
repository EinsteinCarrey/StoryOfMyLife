const helper = require("./helperMethods");
const express = require("express");
let router = express.Router();
let Story = require("../models/stories");
let Comment = require("../models/comments");
const slug = require("slug");
const now = new Date();


/* Query the DB and if no errors, retrieve all the stories */
const fetchStory = (query, response)=>{
    query.exec().then((output)=>{
        output ? response.send(output):
            response.status(404).send({msg: "requested story does not exist"});
    }).catch((err)=>{
        response.send({errMsg: err});
    });
};

/* List all stories */
router.get("/", function (request, response) {
    const query = Story.find();
    fetchStory(query, response);
});

/* Fetch a single story using referenceSlug as key  */
router.get("/:referenceSlug", function (request, response) {
    const query = Story.findOne(request.params);
    fetchStory(query, response);
});

/* Create a new story */
router.post("/", helper.verifyUser, (request, response) =>{
    /* Get current user */
    const userID = request.decoded.userId;
    request.body.user = userID;
    request.body.createdOn = now.toDateString();
    request.body.referenceSlug = slug(request.body.title);

    // Create story
    let newStory = new Story(request.body);

    /* Save it to the DB. */
    newStory.save().then((output)=>{
        response.status(201).send(output);
    }).catch((err)=>{
        response.send(err);
    });
});

/* Update a story */
router.put("/:referenceSlug", helper.verifyUser, (request, response) =>{

    const key = {referenceSlug : request.params.referenceSlug};

    const updatedStory = {
        referenceSlug: slug(request.body.title),
        title: request.body.title,
        story: request.body.story,
        createdOn: now.toDateString()
    };
    Story.update(key, updatedStory).then((output) => {
        output.n > 0 ? response.send({msg: "Story updated successfully"}) :
            response.status(404).send({errMsg: "You tried updating a story that doesn't exist"});
    }).catch((err)=>{
        response.send({errMsg: err});
    });
});

/* Delete a story */
router.delete("/:referenceSlug", helper.verifyUser, (request, response) =>{
    const key = {referenceSlug : request.params.referenceSlug};

    Story.remove(key).then((output) => {
        output.n > 0 ? response.send({msg: "Story deleted successfully"}) :
            response.status(404).send({errMsg: "You tried deleting a story that doesn't exist"});
    }).catch((err)=>{
        response.send({errMsg: err});
    });
});


module.exports = router;
