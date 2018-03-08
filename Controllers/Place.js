const Places = require('../Models/Place');
const controller = {};

controller.create = (request, reply) => {
    const payloadData = request.payload;
    const address = payloadData;
    console.log("adrs", address)
    const logo = payloadData.logo;
    Places.findOne({ logo })
        .then(placeInfo => {
            console.log("placeeeee", placeInfo)
            if (!placeInfo) {
                return Places.create(payloadData)
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
            console.log(err)
            reply(err).code(500)
        })
}

controller.update = (request, reply) => {
    const id = request.params.id;
    console.log(request.payload)
    Places.findByIdAndUpdate(id, { $set: request.payload }, { new: true })
        .populate('category')
        .then(place => {

            reply({
                message: "Place Updated Syuccessfully",
                place
            }).code(200)
        })
        .catch(err => {
            reply(err).code(500)
        })
}

controller.getAll = (request, reply) => {
    console.log("qry", request.query)
    const category = request.query.c;
    const q = request.query.q;
    var query = {};
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
    //console.log(limit)
    if (!limit) {
        limit = 10;
        skip = 0;
    }
    else {
        skip = limit * (page - 1)
        limit = 10;
    }

    Places.find(query)
        .limit(limit)
        .skip(skip)
        .populate('category')
        .then(places => {
            reply({ places }).code(200)
        })
        .catch((err) => {
            reply(err).code(500)
        })

}

controller.get = (request, reply) => {
    const id = request.params.id;
    Places.findById({ _id: id })
        .populate('category')
        .then(place => {
            reply({
                place
            }).code(200)
        })
        .catch(err => {
            reply(err)
        })
}
// get all places of one user
controller.getPlacesOfOneUser = (request, reply) => {
    const user = request.params.id;
    console.log("papi", user)
    Places.find({ user })
        .then(place => {
            reply({
                place
            }).code(200)
        })
        .catch(err => {
            reply(err)
        })
}

controller.delete = (request, reply) => {
    const id = request.params.id
    Places.deleteOne({ _id: id })
        .then(place => {
            console.log("place ", place)
            reply({
                message: "Deleted"
            }).code(200)
        })
        .catch(err => {
            console.log(err)
            reply(err).code(500)
        })

}
module.exports = controller;