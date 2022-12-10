require('dotenv').config()
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const path = require('path')
const cookieParser = require('cookie-parser')

// const UserRouter = require('./routers/UserRouter')


const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser('rest'))
app.use(session({ cookie: { maxAge: 30 * 24 * 60 * 60 * 1000  } }))
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// routes 
// app.use('/user', UserRouter)


const port = process.env.PORT || 8080
app.listen(port, function(err) {
    console.log(`http://localhost:${port}`)
})

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/about', function(req, res) {
    res.render('about')
})

app.get('/services', function(req, res) {
    res.render('services')
})

app.get('/rooms', function(req, res) {
    res.render('rooms')
})

app.get('/contact', function(req, res) {
    res.render('contact')
})

app.get('/login', function(req, res) {
    res.render('login')
})

// app.use( function(req, res){
//     return res.status(404).render('badgate')
// })