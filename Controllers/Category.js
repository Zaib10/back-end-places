const Category = require('../Models/Category');
const Boom = require('boom')

const controller = {};

//----create category-----
controller.create = (request, reply) => {
    const payloadData = request.payload;
    const title = payloadData.title;
    Category.findOne({ title })
        .then(category => {
            //console.log("category: ", category)
            if (!category) {
                return Category.create(payloadData)
            }
            else {
                return Promise.reject({ isInternal: false })
            }
        })
        .then(category => {
            reply({
                message: "category saved successfully",
                category
            })
        })
        .catch((err) => {
           // console.log('In Err: ', err)
            if (err && !err.isInternal) {
                reply(
                    Boom.conflict('Category is already exist')
                )
            } else {
                //console.log(err)
                reply(
                    Boom.badImplementation('An internal server error occurred')
                )
            }
        })
}

//----Update category------
controller.update = (request, reply) => {
    const id = request.params.id;
    //console.log(id, request.payload)
    const title = request.payload.title;
    Category.findOne({ title })
        .then(isCategory => {
            if (!isCategory) {
                return Category.findByIdAndUpdate({ _id: id }, { $set: request.payload }, { new: true })
            }
            else {
                return Promise.reject({ isInternal: false, message: "Category  already exist" })
            }
        })
        .then(data => {
            reply({
                 data 
                }).code(200)
        })
        .catch((err) => {
            // console.log('In Err: ', err)
             if (err && !err.isInternal) {
                reply(
                    Boom.conflict('Category is already exist')
                )
             } else {
                 //console.log(err)
                 reply(
                    Boom.badImplementation('An internal server error occurred')
                )
             }
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
            //console.log(err)
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
        })
}

//----get one category------
controller.getOne = (request, reply) => {
    //const id = request.params.id;
    const categorySlug = request.query.c
    console.log("categorySlug", categorySlug)
    Category.findOne({ slug: categorySlug })
        .then(category => {
            reply({
                category
            }).code(200)
        })
        .catch((err) => {
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
        })
}

module.exports = controller;