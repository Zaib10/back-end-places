
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture : { type : String },
    role: { type: String, required: true, default: "User", enum: ["Admin", "User"] }
})

const user = mongoose.model('user', UserSchema, 'user');

module.exports = user;
