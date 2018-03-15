const Mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
Mongoose.plugin(slug)
const CategorySchema = Mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true }, // e.g Art and Fashion
    slug: { type: String, slug: "title" },
    details: { type: String, trim: true },
})
const category = Mongoose.model('category', CategorySchema, 'category');

module.exports = category;