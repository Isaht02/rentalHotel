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
			const namefacilities = []
			Facility.getFacility([], function (err, facilities, fields){
				if (err) throw err
				Room.getAllRooms(function(err, rooms, field){
            		if (err) throw err
            		data = {
            			error: req.flash('error'),
            			errorSearch: req.flash('errorSearch'),
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
		var idRe = 0;
		const checkIn = new Date(req.body.checkIn).getFullYear()+'-'+(new Date(req.body.checkIn).getMonth()+1)+'-'+new Date(req.body.checkIn).getDate()
		const checkOut = new Date(req.body.checkOut).getFullYear()+'-'+(new Date(req.body.checkOut).getMonth()+1)+'-'+new Date(req.body.checkOut).getDate()
        Payment.addReservation([req.session.idCus, req.params.id, checkIn, checkOut, req.body.total], function(err, results, field){
            if (err) throw err
            Payment.getNewIDOfReservation([], function (err, results, fields) {
            	if (err) throw err
	        	idRe = results[0].LastID
	        	Payment.addPayment([idRe, req.session.idCus, req.body.total], function(err, results, field){
            		if (err) throw err
            		return res.redirect('/detail/'+req.params.id)
            	})
            })
        })
    }
}	