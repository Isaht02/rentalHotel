const conn = require('../models/db/config')

const Payment = {
    addReservation: function([], callback){
        return conn.query('Insert into reservations(customer_id, room_id, date, date_in, date_out, total_payment) values(?, ?, ?, ?, ?, ?)', 
            [cusID, rID, date, dateIn, dateOut, total], callback)
    }
}

module.exports = Payment