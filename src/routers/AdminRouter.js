const express = require('express')
const { editUser } = require('../controllers/AdminController')
const AdminController = require('../controllers/AdminController')
const conn = require('../models/db/config')

const Router = express.Router()

//user management
// Router.use(function(req, res, next) {
//     if (!req.session.name || req.session.admin !== 3) {
//         return res.render('badgate')
//     }
//     next()
// })
Router.get('/user', AdminController.getAllUser)

Router.get('/user/delete/:id', AdminController.deleteUser)

Router.get('/user/useredit/:id', AdminController.getEditUser)

module.exports = Router