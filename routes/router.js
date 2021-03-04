const express = require('express');
const router = express.Router();

const controlUser = require('../controller/user_contoller');
const jwtVerify = require('../jwt_data/jwtVerify')
const postDataHandler = require('../controller/postController');
const product = require('../controller/productController');


router.post('/register', controlUser.register);
router.post('/login', controlUser.login);
router.get('/profile', jwtVerify.verifyJwtToken, controlUser.profile);
router.put('/updateProfile/:id', controlUser.updateProfile);

router.get('forgot/:email', controlUser.forget);
// router.delete('delete/', jwtVerify.tokenVerfication, controlUser.deleteUser);
router.post('/create', jwtVerify.verifyJwtToken, postDataHandler.create);
router.get('/getPost', jwtVerify.verifyJwtToken, postDataHandler.getPost);

//product crud
router.post('/createProduct', product.createProduct);
router.get('/getAllProducts', product.findAllProducts);
router.get('/products/:productId', product.findOneProduct);
router.put('/products/:productId', product.updateProduct);
router.delete('/products/:productId', product.deleteProduct);



module.exports = router;