
const Mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
Mongoose.plugin(slug)
const PlaceSchema = Mongoose.Schema({
    title: { type: String, trim: true, required: true },
    slug: { type: String, slug: "title" },
    address: { type: String, trim: true, required: true },
    //images: { type: String, trim: true, required: true},
    description: { type: String, trim: true, required: true },
    logo: { type: String, trim: true, required: true },
    category: { type: Mongoose.Schema.Types.ObjectId, ref: 'category' },
    user : { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },

}, { timestamps: true });

const places = Mongoose.model('place', PlaceSchema, 'place');

module.exports = places;