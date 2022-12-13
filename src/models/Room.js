const conn = require('../models/db/config')

const Room = {
	getRooms:function([], callback){
		return conn.query('Select * from rooms ', [], callback)
	}

}

module.exports = Room