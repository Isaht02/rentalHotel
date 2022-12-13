const express = require('express')
const {check, validationResult} = require('express-validator')
const conn = require('../models/db/config')
const Room = require('../models/Room')

//const User = require('../models/User')


module.exports = {

    searchRooms: function(req, res) {
        const errorSearch = req.flash('errorSearch') || ''
        const error = req.flash('error') || ''
        const name = req.session.name
        const active = 0

        let result = validationResult(req)

        if (result.errors.length == 0) {
            return res.render('rooms', {error, errorSearch, name, active})
        } 
        else {
            result = result.mapped()
            let message
            for (fields in result) {
                message = result[fields].msg
                break
            }
            console.log(message)
            req.flash('errorSearch', message)
            res.redirect('/')
        }
    },

    getAllRooms: function(req, res){
        Room.getAllRooms(function(err, result, field){
            if (err) throw err
            const name = req.session.name
            const active = 0
            const error = req.flash('error') || ''
            const errorSearch = req.flash('errorSearch') || ''

            res.render('index', {result, error, active, name, errorSearch})
        })
    }
}