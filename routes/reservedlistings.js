const express = require('express');
const router = express.Router();
const reservationsCtrl = require('../controllers/reservations');

router.get('/', reservationsCtrl.showReservedListings);
router.get('/:id/delete', reservationsCtrl.deleteReservation);
router.get('/:id/update', reservationsCtrl.showUpdateForm);
router.post('/:id/update', reservationsCtrl.updateReservation);

module.exports = router;