const express = require('express')
const conn = require('../models/db/config')
const RoomController = require('../controllers/RoomController')
const Room = require('../models/Room')
const Payment = require('../models/Payment')
const Facility = require('../models/Facility')


module.exports = {
	getDetail: function(req, res) {
		Room.getRoomByID(req.params.id, function (err, result, fields){
	        if (err) throw err
			const name = req.session.name
			const active = 0
			const error = req.flash('error') || ''
			const namefacilities = []

			Facility.getFacility([], function (err, facilities, fields){
				if (err) throw err
				Room.getAllRooms(function(err, rooms, field){
            		if (err) throw err
            		data = {
            			error: req.flash('error'),
            			checkIn: req.session.checkIn,
            			checkOut: req.session.checkOut,
            			phone: req.session.phone
            		}
					res.render('roomdetail', {rooms, result, active, data, name, facilities})
				})
			})			
    	})
	},

	paymentRoom: function(req, res) {
        const errorSearch = req.flash('errorSearch') || ''
        const error = req.flash('error') || ''
        const name = req.session.name
        const active = 0

        let result = validationResult(req)

        if (result.errors.length == 0) {
            Payment.addReservation([], function(err, results, field){
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
}