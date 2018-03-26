const Joi = require('joi');
const User = require('../Controllers/User');
const fs = require("fs");


const users = [

    //----User Signup-----

    {
        method: 'post',
        path: '/api/user/signup',
        config: {
            auth: false ,
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required().max(6).min(3),
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6)
                    
                }
            }
        },

        handler: User.signUp
    },
    //----User Login-----
    {
        method: 'post',
        path: '/api/user/login',
        config: {
            auth: false ,
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                    
                }
            }
        },
        handler: User.login
    },
    //---User Authentication
    {
        method: 'get',
        path: '/api/user',
        handler: User.getDataByToken
    },

    //--Edit Information----
    {
        method: 'put',
        path: '/api/user/{id}',
        config: {
            validate: {
                payload: {
                    firstName: Joi.string().required().max(6).min(3),
                    lastName: Joi.string().required().max(6).min(3)              
                    
                }
            }
        },
        handler: User.update
    },
     //--upload image----
     {
        method: "POST",
        path: "/api/user/uploads/{id}",
        config: {
            auth :false,
            payload: {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 2 * 1000 * 1000
            }
        },
       
        handler: User.uploadImage
    }

];


module.exports = users;

