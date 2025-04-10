const express = require('express');
const router = express.Router();
const Controller = require('../controllers/home.controller');
const Authmiddleware = require('../middlewares/auth.middleware');





//Home route
router.get('/',Authmiddleware.auth ,Controller.home)
router.post('/homecreate',Authmiddleware.auth,Controller.insertHome); 

module.exports = router;