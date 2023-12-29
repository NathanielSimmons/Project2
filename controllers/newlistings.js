const Newlisting = require('../models/newlisting');

newListing = async (req, res) => {
    try {
      res.render('newlistings/new', {title: "Add Listing" });
    } catch (error) {
      res.render({ error: 'Internal Server Error' });
    }
  };

  getAllListings = async (req, res) => {
    try {
      const listings = await Newlisting.find();
      res.render('newlistings/index', { listings });
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
    const { pictures, bedrooms, bathrooms, sqFootage, startDate, endDate, address, pricePerNight } = req.body;
    const newListing = new Listing({
      pictures: pictures.split(','), 
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      sqFootage: parseInt(sqFootage),
      address,
      pricePerNight: parseFloat(pricePerNight),
    });


    await newListing.save();

   // Render the form page with the "Saved!" message
   res.render('new', { saved: true });
  } catch (error) {
    console.error('Error creating listing:', error);
    // Handle the error, e.g., render an error page
    res.render('error', { error });
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