const Reservation = require('../models/reservation');

postReservation = async (req, res) => {
    try {
      const listingId = req.params.id;
      const { startDate, endDate } = req.body;
  
      
      const listing = await Newlisting.findById(listingId);
  
      if (!listing) {
        return res.status(404).render('error', { error: 'Listing not found' });
      }
  
      
      listing.reservations.push({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
  
      
      await listing.save();
  
      
      res.render('reserve-success', { totalPrice });
    } catch (error) {
      res.status(500).render('error', { error: 'Internal Server Error' });
    }
  };

  module.exports= {
    postReservation
  }