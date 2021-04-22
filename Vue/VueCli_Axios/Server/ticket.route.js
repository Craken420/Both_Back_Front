const express = require('express')
const app = express()
const ticketRoutes = express.Route()

const Ticket = require('../models/Ticket')

ticketRoutes.route('/add').post(function (req, res) {
    var ticket = new Ticket(req.body)
        ticket.save()
    .then(ticket => {
        res.status(200).json({'ticket': 'ticket addeded succefully'})
    })
    .catch(err => {
        res.status(400).send("unable to save to database")
    })
})

ticketRoutes.route('/').get(function (req, res) {
    Ticket.find(function (req, res) {
        if (err) {
            console.log(err)
        } else {
            res.json(tickets)
        }
    })
})

module.exports = ticketRoutes