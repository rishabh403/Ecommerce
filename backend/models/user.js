const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength:[5,'Email must be valid'],
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  profilePic: {
    type: String,
    default: 'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg'
  },
  role : {
    type: String,
  }
},{
    timestamps: true
});

//Method to generate jwt token
userSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn : '24h'});
    return token;
}

//Method to compare password
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

//Method to hash password
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}


const User = mongoose.model('User', userSchema);
module.exports = User;