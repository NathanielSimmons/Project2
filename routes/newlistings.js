const express = require('express');
const router = express.Router();
const newListingsCtrl = require('../controllers/newlistings');

router.get('/new', newListingsCtrl.new);

router.get('/:id', newListingsCtrl.getListingById);
router.post('/', newListingsCtrl.createListing);
router.put('/:id', newListingsCtrl.updateListing);
router.delete('/:id', newListingsCtrl.deleteListing);

module.exports = router;
