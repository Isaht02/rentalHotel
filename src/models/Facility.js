const conn = require('../models/db/config')

const Facility = {
    getFacility: function([id], callback){
        return conn.query('Select * from facilities', [id], callback)
    }
}

module.exports = Facility