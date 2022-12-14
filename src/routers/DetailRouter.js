const express = require('express')
const conn = require('../models/db/config')
const DetailController = require('../controllers/DetailController')

const Router = express.Router()

Router.get('/:id', DetailController.getDetail)

Router.post('/:id', DetailController.paymentRoom)

module.exports = Router