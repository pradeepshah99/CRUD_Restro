const express = require('express');
const router = express.Router();


const adminHandler = require('../controller/adminController');
const tokenVerify = require('../jwt_data/jwtVerify');

router.post('/register', adminHandler.adminReg);
router.post('/login', adminHandler.adminLogin);
router.get('/profile', tokenVerify.tokenValidation, adminHandler.adminProfile);
router.get('/allUsers', adminHandler.findallUser); // getting all users in the admin block






module.exports = router;