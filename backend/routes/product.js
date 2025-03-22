const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const productController = require('../controller/product');
const { authAdmin, authUser } = require('../middleware/auth.middleware');


router.post('/uploadproduct',authAdmin, productController.uploadProduct);
router.get('/allproducts',authAdmin, productController.getAllProducts);
router.patch('/updateproduct',authAdmin, productController.updateProduct);
router.get('/getcategoryproduct', productController.getCategoryProduct);
router.post('/getcategoryproducts', productController.getCategoryProducts);
router.post('/productdetails',productController.getProductDetails);
router.get('/searchproduct',productController.searchProduct);
router.post('/filterproduct',productController.filterProduct);


module.exports = router;