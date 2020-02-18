var mongoose = require('mongoose');
 
module.exports = mongoose.model('usuarios',{
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});

