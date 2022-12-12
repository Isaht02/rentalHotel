const express = require('express')
const conn = require('../models/db/config')

const User = require('../models/User')


module.exports = {

    searchRooms: function(req, res) {
        const error = req.flash('error') || ''
        const name = req.session.name
        const active = 0
        res.render('rooms', { error, name, active})
    }
}