const User = require('../Controllers/User');

const users = [

    //----User Signup-----
    {
        method: 'post',
        path: '/api/user/signup',
        config: { auth: false },
        handler: User.signUp
    },
    //----User Login-----
    {
        method: 'post',
        path: '/api/user/login',
        config: { auth: false },
        handler: User.login
    },
    //--Edit Information----
    {
        method: 'put',
        path: '/api/user/{id}',
        handler: User.update
    },

];

module.exports = users;

