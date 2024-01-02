const express = require('express');
const router = express.Router();
const newListingsCtrl = require('../controllers/newlistings');

router.get('/new', newListingsCtrl.new);

router.post('/', newListingsCtrl.createListing);


module.exports = router;
