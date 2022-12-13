const conn = require('../models/db/config')

const Facility = {
    getFacility: function([], callback){
        return conn.query('Select * from facilities', [], callback)
    },

    getFacilityByID: function([id], callback){
        return conn.query('Select * from facilities where id = ?', [id], callback)
    }
}

module.exports = Facility