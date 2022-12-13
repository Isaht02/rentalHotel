const conn = require('../models/db/config')

const Room = {
	getRoomByID: function([id], callback){
		return conn.query('Select * from rooms where id = ?',[id] , callback)
	},
    getAllRooms: function(callback){
        return conn.query('Select * from rooms', callback)
    }
}

module.exports = Room