

var validate = function (decoded, req, callback) {
      
      if (decoded.role === 'Admin') {
            return callback(null, true, {scope: 'Admin'}); // They're an `admin`
        }
        if (decoded.role === 'User') {
            return callback(null, true, {scope: 'User'}); // They're a `user`
        }
        return callback(null, false);
    


        // do your checks to see if the person is valid
      //   console.log("hi",decoded)
      //  req.currentUserEmail = decoded.email;
      //  req.role = decoded.role;

       
      //  callback(null,true, {decoded})
       
 };
module.exports = validate;
    