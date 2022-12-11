const express = require('express')
const {check, validationResult} = require('express-validator')
const UserController = require('../controllers/UserController')
const Router = express.Router()


const registerValidator = [
	check('first').exists().withMessage('Vui lòng nhập tên của bạn')
	.notEmpty().withMessage('Tên của bạn không được để trống'), 

	check('last').exists().withMessage('Vui lòng nhập họ của bạn')
	.notEmpty().withMessage('Họ của bạn không được để trống'),

	check('username').exists().withMessage('Vui lòng nhập username người dùng')
	.notEmpty().withMessage('Username người dùng không được để trống'),

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

	check('phone').exists().withMessage('Vui lòng nhập số điện thoại của bạn')
	.notEmpty().withMessage('Số điện thoại của bạn không được để trống')
	.isNumeric().withMessage('Số điện thoại không phù hợp'),

	check('address').exists().withMessage('Vui lòng nhập địa chỉ của bạn')
	.notEmpty().withMessage('Địa chỉ của bạn không được để trống')
]

const loginValidator = [
	check('user').exists().withMessage('Vui lòng nhập username')
	.notEmpty().withMessage('Username không được để trống'),

	check('password').exists().withMessage('Vui lòng nhập mật khẩu người dùng')
	.notEmpty().withMessage('Mật khẩu người dùng không được để trống') 
	.isLength({min: 6}).withMessage('Mật khẩu phải nhiều hơn 6 kí tự')
]

Router.get('/', function(req, res) {
	const error = req.flash('error') || ''
	const name = req.session.name
	const active = 0
	res.render('index', {error, name, active})
})

Router.get('/rooms', function(req, res) {
	const error = req.flash('error') || ''
	const name = req.session.name
	const active = 1
	res.render('rooms', {error, name, active})
})

Router.get('/services', function(req, res) {
	const error = req.flash('error') || ''
	const name = req.session.name
	const active = 2
	res.render('services', {error, name, active})
})

Router.get('/about', function(req, res) {
	const error = req.flash('error') || ''
	const name = req.session.name
	const active = 3
	res.render('about', {error, name, active})
})


Router.get('/contact', function(req, res) {
	const error = req.flash('error') || ''
	const name = req.session.name
	const active = 4
	res.render('contact', {error, name, active})
})

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

//Router.get('/login', UserController.getLogin)

Router.post('/', loginValidator, UserController.postLogin)



module.exports = Router