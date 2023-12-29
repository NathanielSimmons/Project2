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

getListingById = async (req, res) => {
  console.log("wrong one!")
  try {
    const listing = await Newlisting.findById(req.params.id);
    if (!listing) {
      return res.render({ error: 'Listing not found' });
    }
    res.render('listingDetails', { listing });
  } catch (error) {
    console.log('Internal Server Errorrrrrrrrr');
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

updateListing = async (req, res) => {
  const { pictures, bedrooms, bathrooms, sqFootage, reservation } = req.body;

  try {
    const updatedListing = await Newlisting.findByIdAndUpdate(
      req.params.id,
      { pictures, bedrooms, bathrooms, sqFootage, reservation },
      { new: true }
    );

    if (!updatedListing) {
      return res.render({ error: 'Listing not found' });
    }

    res.json(updatedListing);
  } catch (error) {
    res.render({ error: 'Internal Server Error' });
  }
};

deleteListing = async (req, res) => {
  try {
    const deletedListing = await Newlisting.findByIdAndDelete(req.params.id);

    if (!deletedListing) {
      return res.render({ error: 'Listing not found' });
    }

    res.json(deletedListing);
  } catch (error) {
    res.render({ error: 'Internal Server Error' });
  }
};

module.exports = {
new: newListing,
deleteListing,
createListing,
updateListing,
getListingById,
getAllListings
}