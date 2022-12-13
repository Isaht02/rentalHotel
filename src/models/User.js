const conn = require('../models/db/config')

const User = {
	getUsersByUsername:function(user, callback){
		return conn.query('Select * from accounts where username = ?', [user], callback)
	},
	addUser:function([username, hashed, first, last, address, phone, gender], callback){
		return conn.query('Insert into accounts(username, password, firstname, lastname, address, phone, gender) values(?, ?, ?, ?, ?, ?, ?)', [username, hashed, first, last, address, phone, gender], callback)
	},
	getUser:function([email, pass, first, last, address], callback){
		return conn.query('Select * from accounts', [email, pass, first, last, address], callback)
	},
	getAllUser:function(callback){
		return conn.query('Select * from accounts', callback)
	},
	deleteUser:function([id],callback){
		return conn.query('Delete from accounts where id = ?', [id], callback)
	},
	getUserByID: function([id], callback){
		return conn.query('Select * from accounts where id = ?', [id], callback)
	}

}

module.exports = User