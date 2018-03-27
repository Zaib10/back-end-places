const Place = require('../Models/Place');
const Category = require('../Models/Category');
const Boom = require('boom')
const fs = require('fs');
const Path = require('path')

const controller = {};

controller.create = (request, reply) => {
    const payloadData = request.payload;
    const title = payloadData.title;
    const address = payloadData.address

    Place.findOne({ title, address })
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
    let { title, address } = request.payload;
    
    let qry = { title, address, _id : {$ne: id }};
    Place.findOne(qry)
        .then(place => {
            if (!place) {
                Place.findByIdAndUpdate(id, { $set: request.payload }, { new: true })
                    .then(place => {
                        reply({
                            message: "Place Updated Syuccessfully",
                            place
                        }).code(200)
                    })
            }
            else {
                return Promise.reject({ isInternal: false })
            }
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

controller.getAll = (request, reply) => {
    console.log("query ", request.query)
    const category = request.query.c;
    const q = request.query.q;
    let query = {};
    Category.findOne({slug : category})
    .then(categoryData=>{
        if(!categoryData){

            return Promise.reject({ isInternal: false, message: "Places Not Exist Against Category" })
        }
        else{

            let category = categoryData._id;
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
        }
    })
    .catch((err) => {
        if (err && !err.isInternal) {
            reply(
                Boom.notFound(err.message)
            )
        } else {
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
        }
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

controller.placeImage = (request, reply) => {
    const data = request.payload;
    // console.log("data", data)
    
    const id = request.params.id;
    let name = `${id}.png`;
    
    console.log("id", request.params)
    // if (id !== request.userId) {
    //     return reply(
    //         Boom.unauthorized('You are not authorized to access this resource')
    //     )
    // }

    // findPlage

    if (data.file) {
        Place.findById(id)
            .then(place => {
                if (place) {
                    // upload image

                    let imageType = data.file.hapi.headers['content-type'];

                    if (imageType == 'image/jpeg') {
                        name = id + '.jpeg';
                    }
                    else if (imageType == 'image/jpg') {
                        name = id + '.jpg';
                    }
                    else if (imageType == 'image/png') {
                        name = id + '.png';
                
                    }
            
            
                    let path_ = Path.resolve(__dirname, '../../react-place-front-end/public', "places");
                    let file = fs.createWriteStream(`${path_}/${name}`);
            
                    file.on('error', function (err) {
                        console.error(err)
                    });

                    data.file.pipe(file);

                    place.placeImage = name;
                    place
                        .save(data => {
                            reply({status: 'ok', place})
                        }).catch(err => {
                            reply(Boom.badImplementation())
                        })
                }
                else {
                    reply(Boom.notFound('Place not found'))
                }
            })
    
    
  
       

        // console.log(" id and name", id, name)

        // Place.findByIdAndUpdate( id, { $set: { placeImage: name } })
        //     .then(resp => {
        //         console.log("resp",resp)

        //         reply(resp)
        //     })
        //     .catch(err => {
        //         reply(err)
            // })
    } else {
        reply(Boom.badData('Image not found'));
    }
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