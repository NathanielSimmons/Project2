const express = require('express');
const router = express.Router();
const listingsCtrl = require('../controllers/newlistings');


router.get('/all-listings', listingsCtrl.getAllListings);

module.exports = router;
