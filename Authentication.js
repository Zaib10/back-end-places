var validate = function (decoded, req, callback) {
    
        // do your checks to see if the person is valid
       req.currentUserEmail = decoded.email;
       callback(null,true, {decoded})
       
 };
module.exports = validate;
    