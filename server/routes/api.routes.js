const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile.controller');
const TransactionController = require('../controllers/transaction.controller');
const Authmiddleware = require('../middlewares/auth.middleware');





//Home route
router.post('/createprofile', ProfileController.profile);
router.post('/login', ProfileController.login);
router.get('/check-user/:gmail', ProfileController.checkUserExists);
router.post('/transaction', TransactionController.transaction);
router.get('/transactions/:gmail', TransactionController.getTransactionsByGmail);
router.get('/transactions_all', TransactionController.getAllTransactions);
router.put('/transaction-status', TransactionController.updateTransactionStatus);





module.exports = router;