
const User = require('./Models/User');
var validate = function (decoded, req, callback) {
    req.activatedUserEmail = decoded.email;
    req.userId = decoded._id;

    //find user by id (decoded._id)
    User
        .findById(decoded._id)
        .then(user => {
            //console.log(user)
            if (!user)//|| (user && user.status != 'ACTIVE')
            {
                return callback('User not active or not found', false);
            }

            return callback(null, true, { scope: decoded.role }); // They're a `user`
        })
        .catch(err => {
            console.log(err)
            return callback(err);
        })

   

};
module.exports = validate;
