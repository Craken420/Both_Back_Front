const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Ticket = new Schema({
    email: {
        type: String
    },
    description: {
        type: String
    }
},{
    collection: 'tickets'
});

module.eports = mongoose.model('Ticket', Ticket)