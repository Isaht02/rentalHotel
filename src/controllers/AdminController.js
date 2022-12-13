const express = require('express')
const { Result } = require('express-validator')
const conn = require('../models/db/config')

const User = require('../models/User')
const Room = require('../models/Room')

module.exports = {
    getAllUser: function(req, res){
        User.getAllUser(function(err, result, field){
            if(err) throw err
            const name = req.session.name
            const active = 0
            const error = req.flash('error') || ''
            res.render('useradmin', {result : result})
        })
    },

    deleteUser: function(req, res) {

        User.deleteUser(req.params.id,function(err, result, fields){
            if(err) throw err
            const name = req.session.name
            const active = 0
            const error = req.flash('error') || ''

            res.redirect('/admin/user')
        })
    },

    getEditUser: function(req, res) {
        User.getUserByID(req.params.id, function(result, err, fields){
            if(err) throw err

            res.render('useredit', {result})
        })
    }
}