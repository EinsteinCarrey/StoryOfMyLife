const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

let helperMethods = {};

/* middleware to verify authentication token */
helperMethods.verifyUser = function (request, response, next){

    // check header or url parameters or post parameters for token
    let token = request.body.token || request.query.token || request.headers["x-access-token"];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return response.json({errMsg: "Authenticate token is invalid"});
            } else {
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token return an error
        return response.status(403).send({
            errMsg: "No token provided."
        });

    }
};

module.exports = helperMethods;