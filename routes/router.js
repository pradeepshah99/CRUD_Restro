const express = require('express');
const router = express.Router();

const controlUser = require('../controller/user_contoller');
const jwtVerify = require('../jwt_data/jwtVerify')
const postDataHandler = require('../controller/postController')

router.post('/register', controlUser.register);
router.post('/login', controlUser.login);
router.get('/profile', jwtVerify.verifyJwtToken, controlUser.profile);
router.put('/updateProfile/:id', controlUser.updateProfile);

router.get('forgot/:email', controlUser.forget);
// router.delete('delete/', jwtVerify.tokenVerfication, controlUser.deleteUser);
router.post('/create', jwtVerify.verifyJwtToken, postDataHandler.create);
router.get('/getPost', jwtVerify.verifyJwtToken, postDataHandler.getPost)




module.exports = router;