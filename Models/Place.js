
const Mongoose = require('mongoose');
const Place = Mongoose.Schema({
    title: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    images: { type: String, trim: true, required: true},
    description: { type: String, trim: true, required: true },
    logo: { type: String, trim: true, required: true },
    category: { type: Mongoose.Schema.Types.ObjectId, ref: 'category' },
    // createdBy: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },

}, { timestamps: true });

const places = Mongoose.model('places', Place, 'places');

module.exports = places;