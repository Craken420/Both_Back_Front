const mongoose = require('mongoose')
//Documentos
var UsersSchema = mongoose.Schema({
    name: String,
    email: String
});
var User = mongoose.model('User', UsersSchema);
module.exports = User;
