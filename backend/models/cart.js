const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const cartSchema=new Schema({
    productId: {
        ref:"product",
        type:mongoose.Schema.Types.ObjectId,
    },
    quantity: Number,
    userId: String
},{
    timestamps:true
});

const Cart=mongoose.model('cart',cartSchema)
module.exports = Cart