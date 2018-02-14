const Mongoose = require('mongoose');

var bcrypt = require('bcrypt');
var slugify = require('slugify')

const Category = Mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true }, // Art and Fashion
   // slugify: { type: String, required: true, trim: true, unique: true }, // art-and-fashion
    details: { type: String, trim: true },
    //places: { type: Mongoose.Schema.Types.ObjectId, ref: 'places' },
})
const category = Mongoose.model('category', Category, 'category');

module.exports = category;