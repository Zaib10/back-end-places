
const User = require('./Models/User');
var validate = function (decoded, req, callback) {
    req.activatedUserEmail= decoded.email;
      
    //find user by id (decoded._id)
    User
        .findById(decoded._id)
        .then(user => {
            //console.log(user)
            if (!user )//|| (user && user.status != 'ACTIVE')
             {
                return callback('User not active or not found', false);
            }

            return callback(null, true, {scope: decoded.role}); // They're a `user`
        })
        .catch(err => {
            console.log(err)
            return callback(err);
        })

    
    


        // do your checks to see if the person is valid
      //   console.log("hi",decoded)
      //  req.currentUserEmail = decoded.email;
      //  req.role = decoded.role;

       
      //  callback(null,true, {decoded})
       
 };
module.exports = validate;
    