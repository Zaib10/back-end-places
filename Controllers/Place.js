const Place = require('../Models/Place');
const Boom = require('boom')

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
                return Promise.reject({ isInternal: false })
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
                reply(
                    Boom.conflict('Place  already exist')
                )
            } else {
                reply(
                    Boom.badImplementation('An internal server error occurred')
                )
            }
        })

}
controller.update = (request, reply) => {
    const id = request.params.id;
    Place.findByIdAndUpdate(id, { $set: request.payload }, { new: true })
        //.populate('category')
        .then(place => {
            reply({
                message: "Place Updated Syuccessfully",
                place
            }).code(200)
        })
        .catch(err => {
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
        })
}

controller.getAll = (request, reply) => {
    console.log("query ", request.query)
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
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
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
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
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
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
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
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
        })
}
module.exports = controller;