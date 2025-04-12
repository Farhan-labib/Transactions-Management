const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile.controller');
const TransactionController = require('../controllers/transaction.controller');
const Authmiddleware = require('../middlewares/auth.middleware');





//Home route
router.post('/createprofile', ProfileController.profile);
router.post('/login', ProfileController.login);
router.get('/check-user/:gmail', Authmiddleware.protect , ProfileController.checkUserExists);
router.post('/transaction', Authmiddleware.protect , TransactionController.transaction);
router.get('/transactions/:gmail',Authmiddleware.protect ,TransactionController.getTransactionsByGmail);
router.get('/transactions_all', Authmiddleware.protect  ,TransactionController.getAllTransactions);
router.put('/transaction-status',Authmiddleware.protect , TransactionController.updateTransactionStatus);





module.exports = router;