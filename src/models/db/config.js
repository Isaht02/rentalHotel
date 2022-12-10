const {HOST, USER, PASSWORD, DATABASE} = process.env
const mysql = require('mysql')

const con = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE
})

con.connect(function(err){
	if (err) throw err
	else
	console.log('Connected to Mysql Successful!')
})

module.exports = con 
