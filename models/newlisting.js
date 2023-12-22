const mongoose = require('mongoose');

const newListingSchema = new mongoose.Schema({
  pictures: [String],
  bedrooms: Number,
  bathrooms: Number,
  sqFootage: Number,
  reservation: { type: Date, default: null },
});

const Newlisting = mongoose.model('Newlisting', newListingSchema);

module.exports = Newlisting;