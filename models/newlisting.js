const mongoose = require('mongoose');

const newListingSchema = new mongoose.Schema({
  pictures: [String],
  bedrooms: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  bathrooms:  {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  sqFootage: {
    type: Number,
    required: true,
    min: 500,
    max: 10000,
  },
  reservation: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  address: {
    type: String,
    required: true,
  },
});

const Newlisting = mongoose.model('Newlisting', newListingSchema);

module.exports = Newlisting;