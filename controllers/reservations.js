const Reservation = require('../models/reservation');

const postReservation = async (req, res) => {
  try {
    const listingId = req.params.id;
    const { startDate, endDate } = req.body;

   
    if (!startDate || !endDate) {
      return res.status(400).render('error', { error: 'Invalid reservation dates' });
    }

    
    const listing = await Newlisting.findById(listingId);

    
    if (!listing) {
      return res.status(404).render('error', { error: 'Listing not found' });
    }

    
    const totalPrice = calculateTotalPrice(startDate, endDate, listing.pricePerNight);

    
    const reservation = new Reservation({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice: totalPrice,
      listing: listing._id,
    });

    
    await reservation.save();

    
    res.redirect(`/all-listings/${listingId}/reserve-success?totalPrice=${totalPrice}`);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
};

const calculateTotalPrice = (startDate, endDate, pricePerNight) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const totalPrice = days * pricePerNight;
  return totalPrice;
};

module.exports = {
  postReservation
};