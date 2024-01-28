const express = require('express');
const router = express.Router();
const listingsCtrl = require('../controllers/newlistings');


router.get('/', listingsCtrl.getAllListings);
router.get('/delete/:id', listingsCtrl.deleteListing);
router.get('/:id/review', listingsCtrl.showReviewForm);
router.post('/:id/review', listingsCtrl.postReview);

module.exports = router;
