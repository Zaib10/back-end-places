const PlacesController = require('../Controllers/Place');

const Places = [
    {
        method: "POST",
        path: "/api/places",
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['Admin', 'User']
            },
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
    {
        method: "PUT",
        path: "/api/places/{id}",
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['Admin', 'User']
            },
        },
        handler: PlacesController.update
    },
    {
        method: "DELETE",
        path: "/api/places/{id}",
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['Admin', 'User']
            },
        },
        handler: PlacesController.delete
    }
]
module.exports = Places;