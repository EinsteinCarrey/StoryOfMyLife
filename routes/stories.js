const express = require('express');
let router = express.Router();
let Stories = require('../models/stories');


router.get('/', function (request, response) {
    //Query the DB and if no errors, retrieve all the stories
    let query = Stories.find({});
    query.exec().then((output)=>{
        response.send(output);
    }).catch((err)=>{
        response.send({error: err});
    });
});

/* GET home page. */
router.post('/', function (req, res) {
    console.log(req.body);
    res.send(req.body);
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
