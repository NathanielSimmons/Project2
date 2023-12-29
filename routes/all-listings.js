const express = require('express');
const router = express.Router();
const listingsCtrl = require('../controllers/newlistings');


router.get('/', listingsCtrl.getAllListings);

module.exports = router;
