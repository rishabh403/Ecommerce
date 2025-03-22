const blackListTokenModel = require('../models/blackListToken');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.authUser = async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }
    const isBlackListed=await blackListTokenModel.findOne({token:token});
    if(isBlackListed){
        res.status(401).json({message: "Unauthorized"}); 
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded._id);
        req.user=user;
        req.userId=decoded?._id
        
        return next();
    }catch(err){
        return res.status(401).json({message : "Unauthorized"});
    }
};

module.exports.authAdmin = async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }
    const isBlackListed=await blackListTokenModel.findOne({token:token});
    if(isBlackListed){
        res.status(401).json({message: "Unauthorized"}); 
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded._id);
        if(user.role!=='ADMIN'){
            return res.status(401).json({message : "Unauthorized"});
        }
        req.user=user;
        return next();
    }catch(err){
        return res.status(401).json({message : "Unauthorized"});
    }
}