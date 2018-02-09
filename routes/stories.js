const express = require('express');
let router = express.Router();
let Stories = require('../models/stories');

/* GET home page. */
router.post('/', function (request, response) {
    /* Get current user */
    const userID = request.decoded.userId;
    response.send(userID);
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
