const User = require('../Models/User');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Config = require('../Config'); //security key
const Boom = require('boom')

const controller = {};

//-----SignUp-----
controller.signUp = (request, reply) => {
    const payloadData = request.payload;
    const p = payloadData.password;
    payloadData.password = Bcrypt.hashSync(p, Bcrypt.genSaltSync(2))

    User.findOne({ email: payloadData.email })
        .then(userFound => {
            if (!userFound) {
                // user email is available
                return User.create(payloadData);
            } else {
                // user email not avaialble
                return Promise.reject({ type: "USER_NOT_AVAILABLE", message: "User email already exists" })
            }
        })
        .then(user => {
            reply({
                message: "Signup successfuly",
                user: user
            })
        }).catch((err) => {
            if (err.type && err.type == 'USER_NOT_AVAILABLE') {
                reply(
                    Boom.conflict('User email already exists')
                )
            } else {
                reply(
                    Boom.badImplementation('An internal server error occurred')
                )
            }
        })
}

//---login---

controller.login = (request, reply) => {
    const email = request.payload.email;
    const password = request.payload.password;
    User.findOne({ 'email': email })
        .then(userFound => {
            if (!userFound) {
                reply(
                    Boom.unauthorized('invalid Email')
                )
            }
            else if (Bcrypt.compareSync(password, userFound.password)) {
                let token = jwt.sign({ email: userFound.email, role: userFound.role, _id: userFound._id }, Config.jwt.securityCode, { algorithm: 'HS256' });
                reply(
                    {
                        data: {
                            _id: userFound._id,
                            firstName: userFound.firstName,
                            lastName: userFound.lastName,
                            email: userFound.email,
                            role: userFound.role
                        },
                        token: token
                    }
                ).code(200)
            }

            else {

                reply(
                    Boom.unauthorized('invalid password')
                )

            }
        })
        .catch(err => {
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
        })
}

//--- user get by token---

controller.getDataByToken = (request, reply) => {
    const email = request.activatedUserEmail
    User.findOne({ email }).select('firstName lastName email')
        .then(user => {
            reply(user)
        })
        .catch(err => {
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
        })
}

//---Update User data---

controller.update = (request, reply) => {
    const id = request.params.id;

    if (id !== request.userId) {
        return reply(
            Boom.unauthorized('You are not authorized to access this resource')
        )
    }

    User.findByIdAndUpdate({ _id: id }, { $set: request.payload }, { new: true }).select('firstName lastName email')
        .then(user => {
            reply(user)
        })
        .catch(err => {
            reply(
                Boom.badImplementation('An internal server error occurred')
            )
        })
}


module.exports = controller;
