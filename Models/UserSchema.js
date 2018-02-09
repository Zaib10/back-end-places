
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName : {type : String, required : true, trim : true},
    lastName : {type : String, required : true, trim : true},    
    email  : { type  : String, required : true, unique : true},
    password : { type :String , required : true},
    role : { type : String, required : true, default : "User", enum : ["Admin", "User"]   }
})



const user = mongoose.model('user', userSchema ,'user');

module.exports = user;
