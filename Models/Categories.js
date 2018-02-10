const Mongoose = require('mongoose');

var bcrypt = require('bcrypt');

const Categories = Mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true }, // Art and Fashion
   // slug: { type: String, required: true, trim: true, unique: true }, // art-and-fashion
    details: { type: String, trim: true },
    //places: { type: Mongoose.Schema.Types.ObjectId, ref: 'places' },
})
const category = Mongoose.model('category', Categories, 'category');

module.exports = category;