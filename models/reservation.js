const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
   listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Newlisting',
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;