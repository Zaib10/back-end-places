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
        },
        handler: Category.update
    },
    {
        method: "get",
        path: "/api/categories",
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['Admin', 'User']
            },
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