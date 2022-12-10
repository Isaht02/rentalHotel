const express = require('express')
const {check, validationResult} = require('express-validator')
const UserController = require('../controllers/UserController')
const Router = express.Router()


const registerValidator = [
	check('first').exists().withMessage('Vui lòng nhập tên của bạn')
	.notEmpty().withMessage('Tên của bạn không được để trống'), 

	check('last').exists().withMessage('Vui lòng nhập họ của bạn')
	.notEmpty().withMessage('Họ của bạn không được để trống'),

	check('email').exists().withMessage('Vui lòng nhập email người dùng')
	.notEmpty().withMessage('Email người dùng không được để trống')
	.isEmail().withMessage('Email không hợp lệ'),

	check('pass').exists().withMessage('Vui lòng nhập mật khẩu người dùng')
	.notEmpty().withMessage('Mật khẩu người dùng không được để trống') 
	.isLength({min: 6}).withMessage('Mật khẩu phải nhiều hơn 6 kí tự'),

	check('passconfirm').exists().withMessage('Vui lòng nhập xác nhận mật khẩu người dùng')
	.notEmpty().withMessage('Mật khẩu xác nhận không được để trống')
	.custom((value, {req}) => {
		if (value !== req.body.pass) {
			throw new Error('Mật khẩu không khớp')
		}
		return true;
	}),

	check('address').exists().withMessage('Vui lòng nhập địa chỉ của bạn')
	.notEmpty().withMessage('Địa chỉ của bạn không được để trống')
]

const loginValidator = [
	check('user').exists().withMessage('Vui lòng nhập email hoặc sđt')
	.notEmpty().withMessage('Email hoặc sđt không được để trống'),

	check('password').exists().withMessage('Vui lòng nhập mật khẩu người dùng')
	.notEmpty().withMessage('Mật khẩu người dùng không được để trống') 
	.isLength({min: 6}).withMessage('Mật khẩu phải nhiều hơn 6 kí tự')
]

Router.get('/register', UserController.getRegister)

Router.post('/register', registerValidator, UserController.postRegister)



Router.get('/logout', function(req, res) {
	req.session.destroy()
	res.redirect('/')
})

Router.get('/fail', function(req, res) {
	if (req.session.name) {
		return res.render('fail')
	}
	return res.render('success')
})

Router.get('/login', UserController.getLogin)

Router.post('/login', loginValidator, UserController.postLogin)

module.exports = Router