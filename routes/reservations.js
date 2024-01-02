const express = require('express');
const router = express.Router();
const reservationsCtrl = require('../controllers/reservations'); 

router.get('/all-listings/:id/reserve', reservationsCtrl.showReservationForm);

router.post('/all-listings/:id/reserve', reservationsCtrl.postReservation);



module.exports = router;

