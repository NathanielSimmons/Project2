const express = require('express');
const router = express.Router();
const listingsCtrl = require('../controllers/newlistings');


router.get('/', listingsCtrl.getAllListings);
router.get('/delete/:id', listingsCtrl.deleteListing);


module.exports = router;
