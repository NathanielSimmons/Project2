const express = require('express');
const router = express.Router();
const reservationsCtrl = require('../controllers/reservations');

router.get('/reserved', reservationsCtrl.showReservedListings);

module.exports = router;