const Category = require('../Models/Categories');
const controller = {};

//----create category-----
controller.create = (request, reply) => {
    const payloadData = request.payload;
    const title = payloadData.title;
    Category.findOne({ title })
        .then(category => {
            console.log("category: " , category)
            if (!category) {
                return Category.create(payloadData)
            }
            else {
                return Promise.reject({ isInternal: false, message: "Category  already exist" })

            }
        })
        .then(category => {
            reply({
                message: "category saved successfully",
                category
            })
        })

        .catch((err) => {
            console.log('In Err: ', err)
            if (err && !err.isInternal) {
                reply(err).code(400)
            } else {
                console.log(err)
                reply(err)
            }
        })

}

//----Update category------
controller.update = (request, reply) => {
    const id = request.params.id;
    console.log(id, request.payload)
    Category.findByIdAndUpdate(id, { $set: request.payload }, { new: true })
        .then(a => {
            reply(a).code(200)
        })
        .catch((err) => {
            reply(err).code(500)
        })


}

//----Get all categories-----
controller.getAll = (request, reply) => {
    Category.find({})
        .then(categories => {
            reply({
                categories
            })
        })
        .catch((err) => {
            reply(err)
        })


}

//----get one category------
controller.getOne = (request, reply) => {
    const id = request.params.id;
    Category.findOne({ _id: id })
        .then(category => {
            reply({
                category
            }).code(200)
        })
        .catch((err) => {
            reply(err).code(500)
        })

}


module.exports = controller;