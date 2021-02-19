const express = require('express');
const router = express.Router();

const controlUser = require('../controller/user_contoller');
const jwtVerify = require('../jwt_data/jwtVerify')

router.post('/register', controlUser.register);
router.post('/login', controlUser.login);
router.get('/profile', jwtVerify.tokenVerfication, controlUser.profile );
router.put('/updateProfile', jwtVerify.tokenVerfication, controlUser.updateProfile);
router.get('forgot/:email', controlUser.forget);

module.exports = router;