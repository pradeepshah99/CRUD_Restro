const express = require('express');
const router = express.Router();


const adminHandler = require('../controller/adminController');
const tokenVerify = require('../jwt_data/jwtVerify');

router.post('/register', adminHandler.adminReg);
router.post('/login', adminHandler.adminLogin);
router.get('/profile', tokenVerify.tokenValidation, adminHandler.adminProfile);
router.get('/allUsers', tokenVerify.tokenValidation, adminHandler.findallUser); // getting all users in the admin block
router.put('/updateUser/:id', tokenVerify.tokenValidation, adminHandler.updateUser);
router.delete('/deleteUser/:id', tokenVerify.tokenValidation, adminHandler.deleteUser);






module.exports = router;