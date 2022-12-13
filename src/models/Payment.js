const conn = require('../models/db/config')

const Payment = {
    addReservation: function([cusID, rID, dateIn, dateOut, total], callback){
        return conn.query('Insert into reservations(customer_id, room_id, date, date_in, date_out, total_payment) values(?, ?, now(), ?, ?, ?)', 
            [cusID, rID, dateIn, dateOut, total], callback)
    },
    getNewIDOfReservation: function([], callback){
        return conn.query('SELECT id AS LastID FROM reservations WHERE id = @@Identity;', [], callback)
    },
    addPayment: function([reID, cusID, total], callback){
        return conn.query('Insert into payments(reservations_id, customer_id, total_price, date) values(?, ?, ?, now())', 
            [reID, cusID, total], callback)
    }
}

module.exports = Payment