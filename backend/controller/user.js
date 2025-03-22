const { validationResult } = require('express-validator');
const User = require('../models/user');
const Cart=require("../models/cart");
const userService = require('../services/user');
const blackListTokenModel = require('../models/blackListToken');
const Product=require('../models/product')
const mongoose = require("mongoose");


module.exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, profilePic } = req.body;
  const isUserExist = await User.findOne({ email });
  //console.log(isUserExist);
  if (isUserExist) {
    return res.status(400).json({ message: "This user already exists" });
  }

  const hashedPassword = await User.hashPassword(password);
  const user = await userService.createUser({ name, email, password: hashedPassword,profilePic,role:'ADMIN'});
  const token = user.generateAuthToken();
  return res.status(201).json({ token, user });
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = user.generateAuthToken();
  res.cookie('token', token);
  return res.status(200).json({ token, user });
};

module.exports.profile = async (req, res, next) => {
  return res.status(200).json(req.user);
};

module.exports.logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  await blackListTokenModel.create({ token });
  res.clearCookie('token');
  return res.status(200).json({ message: "Logged out successfully" });
}

module.exports.allUsers = async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json(users);
};

module.exports.updateUserRole = async (req, res, next) => {
  const { userId, role } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.role = role;
  await user.save();
  return res.status(200).json({ message: "User role updated successfully" });
};

module.exports.addtocart=async (req,res)=>{
  try{
    const {productId}=req?.body
    const currUser=req.userId;
    //console.log(currUser)
    const isProductAvailable=await Cart.find({productId})
    
    if(isProductAvailable.length !== 0){
      return res.status(201).json({
        success:true,
        error: false,
        message: "already exists in cart"
      })
    }
    const payload={
      productId,
      userId:currUser,
      quantity:1
  }
  const newcart=new Cart(payload)
  //console.log("inside backend",newcart)
  const saveproduct=await newcart.save()
  return res.status(200).json({
    message:"Product added in cart",
    success:true,
    error:false,
    data: saveproduct
  })


  }catch(err){
    console.log("error occured",err)
    res.status(400).json({
      success:false,
      error:true,
      message: err?.message || err
    })
  }
}

module.exports.countAddToCartProduct=async (req,res)=>{
  try{
    const userId=req.userId
    const count=await Cart.countDocuments({userId:userId})
    return res.json({
      data:{
        count:count
      },
      success:true,
      error:false,
      message:"ok"
    })
  }catch(err){
    res.json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}


module.exports.addToCartView=async (req,res)=>{
  try{
    const currUser=req.userId
    const allProducts=await Cart.find({userId:currUser}).populate("productId");
    res.json({
      data:allProducts,
      success:true,
      error:false
    })
  }catch(err){
    res.json({
      error:true,
      success:false,
      message:err.message || err
    })
  }
}

module.exports.updateAddToCart=async (req,res)=>{
  try{
    const currUser=req.userId
    const product=req.body._id
    const qty=req.body.quantity
    const updateProduct=await Cart.findByIdAndUpdate(product,{...(qty&&{quantity:qty})})
    res.json({
      message:"product updated",
      data:updateProduct,
      error:false,
      success:true
    })
  }catch(err){
    res.json({
      success:false,
      error:true,
      message:err.message || err
    })
  }
}


module.exports.deleteProductFromCart = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.isValidObjectId(_id)) {
      return res.status(400).json({ success: false, message: "Invalid cart item ID" });
    }

    const deletedCartItem = await Cart.findByIdAndDelete(_id);

    if (!deletedCartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({ success: true, message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
