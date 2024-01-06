const express = require('express');
const router = express.Router();
const reservationsCtrl = require('../controllers/reservations'); 


router.get('/:id/reserve', reservationsCtrl.showReservationForm);


router.post('/:id/reserve', reservationsCtrl.postReservation);

module.exports = router;
