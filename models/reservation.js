const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Newlisting',
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;