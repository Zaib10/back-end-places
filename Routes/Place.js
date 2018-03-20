const Joi = require('joi');
const PlacesController = require('../Controllers/Place');

const Places = [
    {
        method: "POST",
        path: "/api/places",
        config: {
            auth: {
                scope: ['Admin', 'User']
            },
            validate: {
                payload: {
                    title: Joi.string().required().max(150).min(5),
                    address: Joi.string().required().max(1000).min(10),
                    // images: Joi.string().required(),
                    description: Joi.string().required().min(5),
                    logo: Joi.string().required(),
                    location: {
                        lat: Joi.number().required(),
                        lng: Joi.number().required()
                    },
                    category: Joi.string().required(),
                    user: Joi.string().required()

                }
            }
        },

        handler: PlacesController.create
    },
    {
        method: "GET",
        path: "/api/places",
        config: { auth: false },
        handler: PlacesController.getAll
    },
    {
        method: "GET",
        path: "/api/places/{id}",
        config: { auth: false },
        handler: PlacesController.get
    },
    // get all places of one user
    {
        method: "GET",
        path: "/api/places/userId/{id}",
        config: { auth: false },
        handler: PlacesController.getPlacesOfOneUser
    },
    {
        method: "PUT",
        path: "/api/places/{id}",
        config: {
            auth: {
                scope: ['Admin', 'User']
            },
            validate: {
                payload: {
                    title: Joi.string().required().max(150).min(7),
                    address: Joi.string().required().max(500).min(10),
                    //  images: Joi.string().required(),
                    description: Joi.string().required().min(5),
                    logo: Joi.string().required(),
                    location: {
                        lat: Joi.number().required(),
                        lng: Joi.number().required()
                    },
                    category: Joi.string().required()

                }
            }
        },
        handler: PlacesController.update
    },
    {
        method: "DELETE",
        path: "/api/places/{id}",
        config: {
            auth: {
                scope: ['Admin', 'User']
            },
        },
        handler: PlacesController.delete
    }
]
module.exports = Places;