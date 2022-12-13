const express = require('express')
const {check, validationResult} = require('express-validator')
const RoomController = require('../controllers/RoomController')
const Router = express.Router()

const roomValidator = [
	check('checkIn').exists().withMessage('Vui lòng nhập ngày đặt phòng')
	.notEmpty().withMessage('Ngày đặt phòng của bạn không được để trống')
	.custom((value, {req}) => {
		const timeElapsed = Date.now();
		const checkIn = new Date(value).getTime()
		//console.log(new Date(value).getDate())
		if (checkIn < timeElapsed) {
			throw new Error('Ngày đặt phòng không hợp lệ')
		}
		return true;
	}),

	check('checkOut').exists().withMessage('Vui lòng nhập ngày trả phòng')
	.notEmpty().withMessage('Ngày trả phòng của bạn không được để trống')
	.custom((value, {req}) => {
		const timeElapsed = Date.now();
		const checkOut = new Date(value).getTime()

		if (checkOut < timeElapsed) {
			throw new Error('Ngày trả phòng không hợp lệ')
		}
		else if (checkOut <= new Date(req.body.checkIn).getTime()) {
			throw new Error('Ngày trả phòng không được nhỏ hơn hoặc bằng ngày đặt phòng')
		}
		else if (checkOut - new Date(req.body.checkIn).getTime() >= 7 * 24 * 60 * 60 * 1000) {
			throw new Error('Đặt phòng không quá 7 ngày')
		}
		return true;
	}),

	check('person').exists().withMessage('Vui lòng nhập số lượng người')
	.notEmpty().withMessage('Số lượng người không được để trống'),

	check('phone').exists().withMessage('Vui lòng nhập số điện thoại của bạn')
	.notEmpty().withMessage('Số điện thoại của bạn không được để trống')
	.isNumeric().withMessage('Số điện thoại không phù hợp'),
]

Router.post('/', roomValidator, RoomController.searchRooms)

//Router.post('/', loginValidator, UserController.postLogin)



module.exports = Router