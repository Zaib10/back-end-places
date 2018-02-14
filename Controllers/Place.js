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
    const title = request.query.t;
    var query = {};
    if (category && title) {
        query = {
            category,
            $or: [
                { 'title': { $regex: new RegExp('^' + title, "ig") } }
            ]
        }
    }
    if (category) {
        query = { category }
    }
    if (title) {
        query = {
            $or: [
                { 'title': { $regex: new RegExp('^' + title, "ig") } }
            ]
        };
    }
    var limit = parseInt(request.query.l);
    var page = request.query.p;
    var limta = 1;
    console.log()
    console.log("limit",limita)
    if (limit) {
        limita += 1;
    }
    // else {
    //     limta += limita
    //     console.log("limta",limta)
    // }
    Places.find(query)
        .limit(limita)
        //.skip()
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