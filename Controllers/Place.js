const Place = require('../Models/Place');
const controller = {};

controller.create = (request, reply) => {
    const payloadData = request.payload;
    const address = payloadData;
    const logo = payloadData.logo;
    Place.findOne({ logo })
        .then(place => {
            if (!place) {
                return Place.create(payloadData)
            }
            else {
                return Promise.reject({ isInternal: false, message: "Place  already exist" })
            }
        })
        .then(place => {
            reply({
                message: "Place created successfully",
                place
            })
        })
        .catch(err => {
            if (err && !err.isInternal) {
                reply({
                    ...err
                }).code(409);
            } else {
                reply({
                    message: "Internal Server error",
                    err
                }).code(500)
            }
        })
}

controller.update = (request, reply) => {
    const id = request.params.id;
    Place.findByIdAndUpdate(id, { $set: request.payload }, { new: true })
        .populate('category')
        .then(place => {
            reply({
                message: "Place Updated Syuccessfully",
                place
            }).code(200)
        })
        .catch(err => {
            reply({
                message: "Internal Server error",
                err
            }).code(500)
        })
}

controller.getAll = (request, reply) => {
    const category = request.query.c;
    const q = request.query.q;
    let query = {};
    if (category && q) {
        query = {
            category,
            $or: [
                { 'title': { $regex: new RegExp('^' + q, "ig") } },
                { 'address': { $regex: new RegExp('^' + q, "ig") } },
                { 'description': { $regex: new RegExp('^' + q, "ig") } }
            ]
        }
    }
    else if (category) {
        query = { category }
    }
    else if (q) {
        query = {
            $or: [
                { 'title': { $regex: new RegExp('^' + q, "ig") } },
                { 'address': { $regex: new RegExp('^' + q, "ig") } },
                { 'description': { $regex: new RegExp('^' + q, "ig") } }
            ]
        };
    }
    var limit = parseInt(request.query.l);
    var page = request.query.p;
    var skip;
    if (!limit) {
        limit = 10;
        skip = 0;
    }
    else {
        skip = limit * (page - 1)
        limit = 10;
    }
    Place.find(query)
        .limit(limit)
        .skip(skip)
        .populate('category')
        .then(place => {
            reply({
                place
            }).code(200)
        })
        .catch((err) => {
            reply({
                message: "Internal Server error",
                err
            }).code(500)
        })
}

controller.get = (request, reply) => {
    const id = request.params.id;
    Place.findById({ _id: id })
        //.populate('category')
        .then(place => {
            reply({
                place
            }).code(200)
        })
        .catch(err => {
            reply({
                message: "Internal Server error",
                err
            }).code(500)
        })
}
// get all places of one user
controller.getPlacesOfOneUser = (request, reply) => {
    const user = request.params.id;
    Place.find({ user })
        .then(place => {
            reply({
                place
            }).code(200)
        })
        .catch(err => {
            reply({
                message: "Internal Server error",
                err
            }).code(500)
        })
}

controller.delete = (request, reply) => {
    const id = request.params.id
    Place.deleteOne({ _id: id })
        .then(place => {
            reply({
                message: "Deleted"
            }).code(200)
        })
        .catch(err => {
            reply({
                message: "Internal Server error",
                err
            }).code(500)
        })
}
module.exports = controller;