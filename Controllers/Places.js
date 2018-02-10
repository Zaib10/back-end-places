const Places = require('../Models/Places');
const controller = {};

controller.create = (request, reply) => {
    const payloadData = request.payload;
    Places.create(payloadData)
        .then(place => {
            reply({
                message: "Created place Successsfully"
            }).code(200)
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
    Places.find({})
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