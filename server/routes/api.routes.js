const express = require('express');
const router = express.Router();
const Controller = require('../controllers/profile.controller');
const Authmiddleware = require('../middlewares/auth.middleware');





//Home route
router.post('/createprofile', Controller.profile),
router.post('/login', Controller.login)


module.exports = router;