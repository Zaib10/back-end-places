const Places = require('../Models/Place');
const controller = {};

controller.create = (request, reply) => {
    const payloadData = request.payload;
    const address = payloadData.address;
    console.log("adrs", address)
    const logo = payloadData.logo;
    Places.findOne({logo})
    .then(placeInfo=>{
        console.log("placeeeee", placeInfo)
        if(!placeInfo){
           return Places.create(payloadData)
            
        }
        else{
            return Promise.reject({ isInternal: false, message: "Place  already exist" })

        }
    })
    .then(place=>{
        reply ({
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