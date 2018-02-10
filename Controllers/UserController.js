const User = require('../Models/UserSchema');
var Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Config = require('../Config'); //security key

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
                return Promise.reject({ type: "USER_NOT_AVAILABLE", message: "User email already exists;" })
            }
        })
        .then(user => {
            reply({
                message: "Signup successfuly",
                user: user
            })
        }).catch((err) => {
            console.log(err)
            if (err.type && err.type == 'USER_NOT_AVAILABLE') {
                reply(err).code(409);
            } else {
                reply(err).code(500)
            }
        })
}

//-----login-----

controller.login = (request, reply) => {
    const email = request.payload.email;
    const password = request.payload.password;
    User.findOne({ 'email': email })
        .then(userFind => {
            if (!userFind) {
                reply({
                    message: "Invalid Email",
                    login: false
                }).code(401)
            }
            else if (Bcrypt.compareSync(password, userFind.password)) {
                let token = jwt.sign({ email: userFind.email,role : userFind.role }, Config.jwt.securityCode, { algorithm: 'HS256' });
                reply(
                    {
                        data: {
                            _id: userFind._id,
                            firstName: userFind.firstName,
                            lastName: userFind.lastName,
                            email: userFind.email,
                            role: userFind.role
                        },
                        token: token
                    }
                ).code(200)
            }
            else {
                reply({
                    message: "Invalid Password",
                    login: false
                }).code(401)
            }
        })
        .catch(err => {
            reply({
                message: err
            }).code(500)
        })
}

//---Update User data----

controller.update = (request, reply) => {
    const id = request.params.id;
    console.log("email, role", request.currentUserEmail,request.role)
    User.findByIdAndUpdate({ _id: id }, { $set: request.payload }, { new: true }).select('firstName lastName email')
        .then(user => {
            reply(user)
        })
        .catch(err => {
            reply(err).code(500)
        })
}


module.exports = controller;
