
const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "User", enum: ["Admin", "User"] }
})

const user = mongoose.model('user', User, 'user');

module.exports = user;
