const express = require('express');
const router = express.Router();
const reservationsCtrl = require('../controllers/reservations');

router.get('/', reservationsCtrl.showReservedListings);

module.exports = router;