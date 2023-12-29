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
    res.render('/newlistings/index', { listings });
  } catch (error) {
    res.render({ error: 'Internal Server Error' });
  }
};

getListingById = async (req, res) => {
  console.log("wrong one!")
  try {
    const listing = await Newlisting.findById(req.params.id);
    if (!listing) {
      return res.render({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    console.log('Internal Server Errorrrrrrrrr');
  }
};

createListing = async (req, res) => {
  const { pictures, bedrooms, bathrooms, sqFootage, reservation } = req.body;

  try {
    const newListing = new Newlisting({
      pictures,
      bedrooms,
      bathrooms,
      sqFootage,
      reservation,
    });

    await newListing.save();
    res.status(201).render(newListing);
  } catch (error) {
    res.render({ error: 'Internal Server Error' });
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