const Joi = require('joi');
const Category = require('../Controllers/Category')
const categories = [
    {
        method: "POST",
        path: "/api/categories",
        config: {
            auth: {
                scope: ['Admin']
            },
            validate: {
                payload: {
                    title: Joi.string().required().max(100),
                    details: Joi.string().required().max(1000)
                    
                }
            }
        },
        handler: Category.create
    },
    {
        method: "put",
        path: "/api/categories/{id}",
        config: {
            auth: {
                scope: ['Admin']
            },
            validate: {
                payload: {
                    title: Joi.string().required().max(15).min(7),
                    details: Joi.string().required().max(100).min(10)
                    
                }
            }
        },
        handler: Category.update
    },
    {
        method: "get",
        path: "/api/categories",
         config: {
            auth: false
         },
        handler: Category.getAll
    },
    {
        method: "get",
        path: "/api/categories/{id}",
        config: {
            auth: {
                scope: ['Admin']
            },
        },
        handler: Category.getOne
    }
]

module.exports = categories;