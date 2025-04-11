const express = require('express');
const router = express.Router();
const Controller = require('../controllers/profile.controller');
const Authmiddleware = require('../middlewares/auth.middleware');





//Home route
router.get('/createprofile',Authmiddleware.auth ,Controller.profile)


module.exports = router;