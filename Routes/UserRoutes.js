const User = require('../Controllers/UserController');

const users = [

     //----User Signup-----
     {
        method : 'post',
        path : '/api/signup',
        config: { auth: false },
        handler : User.signUp
    },
     //----User Login-----
     {
        method : 'post',
        path : '/api/login',
        config: { auth: false },
        handler : User.login
    },
    //--Edit Information----
    {
        method : 'put',
        path : '/api/user/{id}',
        handler : User.update
    },
    
];

module.exports = users;

