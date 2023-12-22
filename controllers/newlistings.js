const Newlisting = require('../models/newlisting');

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Newlisting.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Newlisting.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createListing = async (req, res) => {
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
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateListing = async (req, res) => {
  const { pictures, bedrooms, bathrooms, sqFootage, reservation } = req.body;

  try {
    const updatedListing = await Newlisting.findByIdAndUpdate(
      req.params.id,
      { pictures, bedrooms, bathrooms, sqFootage, reservation },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const deletedListing = await Newlisting.findByIdAndDelete(req.params.id);

    if (!deletedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(deletedListing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};