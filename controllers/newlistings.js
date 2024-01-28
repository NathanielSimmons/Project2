const Newlisting = require('../models/newlisting');

newListing = async (req, res) => {
    try {
      res.render('newlistings/new', {title: "Add Listing", saved: false });
    } catch (error) {
      res.render('error', { error: 'Internal Server Error' });
    }
  };

getAllListings = async (req, res) => {
    try {
        const listings = await Newlisting.find();
        res.render('all-listings/listings', { title: 'All Listings', listings });
    } catch (error) {
        res.render('error', { error: 'Internal Server Error' });
    }
};


createListing = async (req, res) => {
  try {
    const { pictures, bedrooms, bathrooms, sqFootage, address, pricePerNight } = req.body;
    const newNewListing = new Newlisting({
      pictures: pictures.split(','), 
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      sqFootage: parseInt(sqFootage),
      address,
      pricePerNight: parseFloat(pricePerNight),
    });


    await newNewListing.save();

    res.render('newlistings/new', { title: "Add Listing", saved: true, message: 'Saved!' });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.render('error', { error, message: 'Failed to save listing.' });
  }
};

deleteListing = async (req, res) => {
  const listingId = req.params.id;

  try {
    const deletedListing = await Newlisting.findByIdAndDelete(listingId);

    if (!deletedListing) {
      return res.status(404).render('error', { error: 'Listing not found' });
    }

    
    res.redirect('/all-listings');
  } catch (error) {
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
};

showReviewForm = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await Newlisting.findById(listingId);
    if (!listing) {
      return res.status(404).render('error', { error: 'Listing not found' });
    }
    res.render('reviews', { listing }); // Render a view to display the listing and its reviews
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Internal Server Error');
  }
};

postReview = async (req, res) => {
  try {
    const listingId = req.params.id;
    const { review, rating } = req.body;

    const listing = await Newlisting.findById(listingId);

    if (!listing) {
      return res.status(404).send('Listing not found');
    }
 
  const newReview = new Review({
    review,
    rating,
    user: req.user._id, 
  });

  
  listing.reviews.push(newReview);

  
  await listing.save();

  
  await newReview.save();

  res.redirect(`/all-listings/${listingId}/reviews`);
} catch (error) {
  console.error('Error posting review:', error);
  res.status(500).send('Internal Server Error');
}
};

    



module.exports = {
new: newListing,
deleteListing,
createListing,
getAllListings,
showReviewForm,
postReview,
}