const express = require('express')
const { check, validationResult } = require('express-validator')
const conn = require('../models/db/config')
const bcrypt = require('bcrypt')

const User = require('../models/User')


module.exports = {

    getRegister: function(req, res) {
        const error = req.flash('error') || ''
        const address = req.flash('address') || ''
        const username = req.flash('username') || ''
        const first = req.flash('first') || ''
        const last = req.flash('last') || ''
        const phone = req.flash('phone') || ''
        res.render('register', { error, address, username, first, last, phone })
    },

    postRegister: function(req, res) {
        let result = validationResult(req)

        if (result.errors.length === 0) {
            const { username, pass, first, last, phone, gender, address} = req.body
            console.log(gender)
            const hashed = bcrypt.hashSync(pass, 10)
            const params = [username, hashed, first, last, address, phone, gender]

            User.addUser(params, function(err, results, fields) {
                if (err) {
                    req.flash('error', err.message)
                    req.flash('address', address)
                    req.flash('username', username)
                    req.flash('first', first)
                    req.flash('last', last)
                    req.flash('phone', phone)
                    return res.redirect('/register')
                } else if (results.affectedRows == 1) {
                    if (req.session.admin === 1 && req.session.name) {
                        return res.redirect('/admin/user')
                    }
                    return res.redirect('/')
                }
                req.flash('error', 'Đăng ký thất bại')
                req.flash('address', address)
                req.flash('username', username)
                req.flash('first', first)
                req.flash('last', last)
                req.flash('phone', phone)
                return res.redirect('/register')
            })

            return;
        }
        result = result.mapped()
        let message
        for (fields in result) {
            message = result[fields].msg
            break
        }
        const { username, first, last, phone, address } = req.body

        req.flash('error', message)
        req.flash('address', address)
        req.flash('username', username)
        req.flash('phone', phone)
        req.flash('first', first)
        req.flash('last', last)
        res.redirect('/register')
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
            User.getUsersByUsername([user], function(err, results, fields) {
                if (err) {
                    req.flash('error', err.message)
                    req.flash('user', user)
                    req.flash('password', password)
                    return res.redirect('/')
                } else if (results.length === 0) {
                    req.flash('error', 'Username không tồn tại')
                    req.flash('user', user)
                    req.flash('password', password)
                    return res.redirect('/')
                } else {
                    const hashed = results[0].password
                    const match = bcrypt.compareSync(password, hashed)
                    if (!match) {
                        req.flash('error', 'Sai username hoặc mật khẩu')
                        req.flash('user', user)
                        req.flash('password', '')
                        return res.redirect('/')
                    } else {
                        req.session.loggedin = true
                        req.session.name = results[0].firstname + " " + results[0].lastname
                        req.session.idCus = results[0].id 
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
            res.redirect('/')
        }

    }
}