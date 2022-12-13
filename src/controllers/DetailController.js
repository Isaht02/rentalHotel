const express = require('express')
const conn = require('../models/db/config')
const Room = require('../models/Room')
const Facility = require('../models/Facility')

module.exports = {
	getDetail: function(req, res) {
		Room.getRoomByID(req.params.id, function (err, result, fields){
        if (err) throw err
		const name = req.session.name
		const active = 0
        const error = req.flash('error') || ''

            Facility.getFacility(req.params.id, function(err, result_facility, field){

		res.render('roomdetail', {result, result_facility, active, error, name})
    	    })
        })
	}
}