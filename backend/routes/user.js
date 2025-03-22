const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controller/user');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/signup',[
    body('email').isEmail().withMessage('invalid email'),
    body('name').isLength({min:3}).withMessage('name should be of minimum length 3'),
    body('password').isLength({min:6}).withMessage('password should be of minimum length 6')
], userController.signup);

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password should be of minimum length 6')
], userController.login);

router.get('/profile',authMiddleware.authUser, userController.profile);

router.get('/logout',authMiddleware.authUser, userController.logout);

router.get('/allusers',authMiddleware.authUser, userController.allUsers);

router.post('/updateuserrole',authMiddleware.authAdmin, userController.updateUserRole);

router.post('/addtocart',authMiddleware.authUser,userController.addtocart);

router.get('/countcart',authMiddleware.authUser,userController.countAddToCartProduct);

router.get('/cartview',authMiddleware.authUser,userController.addToCartView);

router.post('/updateproductcart',authMiddleware.authUser,userController.updateAddToCart);

router.post('/deleteproductcart',authMiddleware.authUser,userController.deleteProductFromCart);

module.exports = router;