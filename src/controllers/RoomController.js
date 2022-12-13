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
            Room.searchRooms(req.body.person, function(err, results, field){
                if (err) throw err
                req.session.checkIn = req.body.checkIn
                req.session.checkOut = req.body.checkOut
                req.session.phone = req.body.phone
                return res.render('rooms', {results, error, errorSearch, name, active})
            })
        } 
        else {
            result = result.mapped()
            let message
            for (fields in result) {
                message = result[fields].msg
                break
            }
            const { checkIn, checkOut, person, phone } = req.body
            req.flash('errorSearch', message)
            req.flash('checkIn', checkIn)
            req.flash('checkOut', checkOut)
            req.flash('person', person)
            req.flash('phone', phone)
            res.redirect('/')
        }
    },

    getAllRooms: function(req, res){
        Room.getAllRooms(function(err, rooms, field){
            if (err) throw err
            const name = req.session.name
            const active = 0
            data = {
                error: req.flash('error') || '',
                errorSearch: req.flash('errorSearch') || '',
                checkIn: req.flash('checkIn'),
                checkOut: req.flash('checkOut'),
                person: req.flash('person'),
                phone: req.flash('phone')
            }
            res.render('index', {rooms, data, active, name})
        })
    }
}