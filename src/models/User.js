const conn = require('../models/db/config')

const User = {
	getUsersByEmail:function(user, callback){
		return conn.query('Select * from account where Email = ?', [user], callback)
	},
	addUser:function([email, hashed, first, last, address], callback){
		return conn.query('Insert into account(Email, Password, Firstname, Lastname, Address) values(?, ?, ?, ?, ?)', [email, hashed, first, last, address], callback)
	},
	getUser:function([email, pass, first, last, address], callback){
		return conn.query('Select * from account', [email, pass, first, last, address], callback)
	},
	deleteUser:function([Email],callback){
		return conn.query('Delete * from account where Email = ?', [Email], callback)
	}

}

module.exports = User