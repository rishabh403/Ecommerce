const User=require("../models/user.js")
const Cart=require("../models/cart.js")

module.exports.createUser = async ({
    name,email,password,profilePic,role
})=>{
    if(!name || !email || !password){
        throw new Error('all fields are required');
    }
    const newuser=await User.create({
        name,
        email,
        password,
        profilePic,
        role
    })
    return newuser;
}



