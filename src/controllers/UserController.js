const express = require('express')
const { check, validationResult } = require('express-validator')
const conn = require('../models/db/config')
const bcrypt = require('bcrypt')

const User = require('../models/User')


module.exports = {

    getRegister: function(req, res) {
        const error = req.flash('error') || ''
        const address = req.flash('address') || ''
        const email = req.flash('email') || ''
        const first = req.flash('first') || ''
        const last = req.flash('last') || ''
        res.render('register', { error, address, email, first, last })
    },

    postRegister: function(req, res) {
        let result = validationResult(req)

        if (result.errors.length === 0) {
            const { email, pass, first, last, address } = req.body

            const hashed = bcrypt.hashSync(pass, 10)
            const params = [email, hashed, first, last, address]

            User.addUser(params, function(err, results, fields) {
                if (err) {
                    req.flash('error', err.message)
                    req.flash('address', address)
                    req.flash('email', email)
                    req.flash('first', first)
                    req.flash('last', last)
                    return res.redirect('/user/register')
                } else if (results.affectedRows == 1) {
                    if (req.session.admin === 1 && req.session.name) {
                        return res.redirect('/admin/user')
                    }
                    return res.redirect('/user/login')
                }
                req.flash('error', 'Đăng ký thất bại')
                req.flash('address', address)
                req.flash('email', email)
                req.flash('first', first)
                req.flash('last', last)
                return res.redirect('/user/register')
            })

            return;
        }
        result = result.mapped()
        let message
        for (fields in result) {
            message = result[fields].msg
            break
        }
        const { email, first, last, address } = req.body

        req.flash('error', message)
        req.flash('address', address)
        req.flash('email', email)
        req.flash('first', first)
        req.flash('last', last)
        res.redirect('/user/register')
    },

    getLogin: function(req, res) {
        const error = req.flash('error') || ''
        const user = req.flash('user') || ''
        const password = req.flash('password') || ''
        res.render('login', { error, user, password })
    },

    postLogin: function(req, res) {
        let result = validationResult(req)

        if (result.errors.length == 0) {
            const user = req.body.user
            const password = req.body.password
            User.getUsersByEmail([user], function(err, results, fields) {
                if (err) {
                    req.flash('error', err.message)
                    req.flash('user', user)
                    req.flash('password', password)
                    return res.redirect('/user/login')
                } else if (results.length === 0) {
                    req.flash('error', 'Email hoặc sđt không tồn tại')
                    req.flash('user', user)
                    req.flash('password', password)
                    return res.redirect('/user/login')
                } else {
                    const hashed = results[0].Password
                    const match = bcrypt.compareSync(password, hashed)
                    if (!match) {
                        req.flash('error', 'Sai email, sđt hoặc mật khẩu')
                        req.flash('user', user)
                        req.flash('password', '')
                        return res.redirect('/user/login')
                    } else {
                        req.session.loggedin = true
                        req.session.name = results[0].Firstname + " " + results[0].Lastname
                        req.session.admin = results[0].Admin
                        req.session.email = results[0].Email
                        req.session.address = results[0].Address
                        return res.redirect('/')
                    }

                }
            })
        } else {
            result = result.mapped()
            let message
            for (fields in result) {
                message = result[fields].msg
                break
            }
            const { user, password } = req.body

            req.flash('error', message)
            req.flash('user', user)
            req.flash('password', password)
            res.redirect('/user/login')
        }

    }
}