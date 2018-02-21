const Joi = require('joi');
const Category = require('../Controllers/Category')
const categories = [
    {
        method: "POST",
        path: "/api/categories",
        //config: { auth: true },  
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['Admin']
            },
            validate: {
                payload: {
                    title: Joi.string().required().max(15).min(7),
                    details: Joi.string().required().max(100).min(10)
                    
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
                strategy: 'jwt',
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
        //     // auth: {
        //     //     strategy: 'jwt',
        //     //     scope: ['Admin', 'User']
        //     // },
         },
        
        handler: Category.getAll
    },
    {
        method: "get",
        path: "/api/categories/{id}",
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['Admin']
            },
        },
        handler: Category.getOne
    }
]
module.exports = categories;