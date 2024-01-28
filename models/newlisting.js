const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  
});

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
  pricePerNight: {
    type: Number,
    required: true,
    min: 200,
    max: 3000,
  },
  address: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema]
});

const Newlisting = mongoose.model('Newlisting', newListingSchema);

module.exports = Newlisting;