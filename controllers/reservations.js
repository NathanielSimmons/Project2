const Reservation = require('../models/reservation');
const Newlisting = require('../models/newlisting');

showReservationForm = async (req, res) => {
  try {

    const listingId = req.params.id;

    
    const listing = await Newlisting.findById(listingId);

    
    if (!listing) {
      return res.status(404).render('error', { error: 'Listing not found' });
    }

  console.log(listing); // Check if the listing object is logged in the console
  res.render('reservations/form', { title: 'Reserve Listing', listingId, listing, successMessage: '' });
  } catch (error) {

    res.status(500).render('error', { error: 'Internal Server Error' });
  }
};

postReservation = async (req, res) => {
  try {
    const listingId = req.params.id;
    const { firstName, lastName, startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).render('error', { error: 'Invalid reservation dates' });
    }

    const listing = await Newlisting.findById(listingId);

    if (!listing) {
      return res.status(404).render('error', { error: 'Listing not found' });
    }

    const reservation = new Reservation({
      firstName: firstName,
      lastName: lastName,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      listing: listing._id,
    });

    await reservation.save();

    const successMessage = 'Reserved!';

    res.render('reservations/form', { title: 'Reserve Listing', listingId,listing, successMessage });
  } catch (error) {
    
    console.error('Error creating reservation:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
};

showReservedListings = async (req, res) => {
  try {
  
    const reservations = await Reservation.find().populate('listing');
    res.render('reservations/reservedListings', { title: 'Reserved Listings', reservations });
  } catch (error) {
    console.error('Error fetching reserved listings:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
};

module.exports = {
  showReservationForm,
  postReservation,
  showReservedListings
};