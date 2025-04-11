const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile.controller');
const TransactionController = require('../controllers/transaction.controller');
const Authmiddleware = require('../middlewares/auth.middleware');





//Home route
router.post('/createprofile', ProfileController.profile),
router.post('/login', ProfileController.login)
router.post('/transaction', TransactionController.transaction)


module.exports = router;