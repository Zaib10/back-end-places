const Mongoose = require('mongoose');

const CategorySchema = Mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true }, // e.g Art and Fashion
    details: { type: String, trim: true },
})
const category = Mongoose.model('category', CategorySchema, 'category');

module.exports = category;