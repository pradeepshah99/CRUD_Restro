const express = require('express');
const router = express.Router();


const adminHandler = require('../controller/adminController');
const tokenVerify = require('../jwt_data/jwtVerify');

router.post('/register', adminHandler.adminReg); // admin registration - only admin purpose
router.post('/login', adminHandler.adminLogin); // admin login
router.get('/profile', tokenVerify.tokenValidation, adminHandler.adminProfile); // admin profile api
router.get('/allUsers', tokenVerify.tokenValidation, adminHandler.findallUser); // getting all users in the admin block
router.put('/updateUser/:id', tokenVerify.tokenValidation, adminHandler.updateUser); // updating user data
router.delete('/deleteUser/:id', tokenVerify.tokenValidation, adminHandler.deleteUser); // deleting user data






module.exports = router;