const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (request, response) {
    response.send({title: 'Expresponses'});
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
