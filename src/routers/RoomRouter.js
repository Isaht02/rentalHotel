const express = require('express')
const RoomController = require('../controllers/RoomController')
const Router = express.Router()


Router.post('/rooms', UserController.searchRooms)

//Router.post('/', loginValidator, UserController.postLogin)



module.exports = Router