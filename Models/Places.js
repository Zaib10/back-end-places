
const Mongoose = require('mongoose');
const placesSchema = Mongoose.Schema({
    title: { type: String, trim: true, required: true, unique: true },
    address: { type: String, trim: true, required: true, unique: true },
    images: { type: String, trim: true, required: true, unique: true },
    description: { type: String, trim: true, required: true, unique: true },
    logo: { type: String, trim: true, required: true, unique: true },
    category: { type: Mongoose.Schema.Types.ObjectId, ref: 'category' },
    // createdBy: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },

}, { timestamps: true });

const places = Mongoose.model('places', placesSchema, 'places');

module.exports = places;