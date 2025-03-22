const Product = require('../models/product');

module.exports.uploadProduct = async (req, res) => {
    try {
        const { productName, brandName, category, productImage, price, sellingPrice, description } = req.body;
        const product = new Product({
            productName,
            brandName,
            category,
            productImage,
            price,
            sellingPrice,
            description
        });
        const x=await product.save();
        res.status(201).json({ message: 'Product uploaded successfully',product: x});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.updateProduct = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body; // Ensure `id` is passed in the request body
    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await Product.distinct('category');
        console.log(productCategory);
        const productByCategory =[]
        for(let category of productCategory){
            const product = await Product.findOne({category});
            if(product){
                productByCategory.push(product);
            }
        }
        res.status(200).json({ 
            message: 'Products fetched successfully',
            category: productCategory,
            data: productByCategory
         });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports.getCategoryProducts = async (req, res) => {
    try {
        const {category}= req?.body || req?.query;
        const product = await Product.find({category})
        res.status(200).json({ 
            message: 'Products fetched successfully',
            success: true,
            data: product
         });
    }
    catch (error) {
        res.status(500).json({
             message: error.message || error,
             error: true,
             success :false
        });
    }
  };

  module.exports.getProductDetails=async (req,res)=>{
    try{
        const { productId } = req.body
        const product = await Product.findById(productId)
        res.status(200).json({
            data : product,
            message : "Ok",
            success : true,
            error : false
        })
    }catch(err){
        res.status(500).json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
  };

  module.exports.searchProduct=async(req,res)=>{
    try{
        const query=req.query.q
        const regex=new RegExp(query,'i','g')
        const product=await Product.find({
            "$or":[
                {
                    productName: regex
                },
                {
                    category: regex
                }
                  ]
        })
        res.json({
            data:product,
            message:"search product list",
            success:true,
            error:false
        })
    }catch(err){
        res.status(500).json({
            success:false,
            error:true,
            message: err.message || err
        })
    }
  }

  module.exports.filterProduct=async (req,res)=>{
    try{
        const categoryList = req?.body?.category || []
        const product = await Product.find({
            category :  {
                "$in" : categoryList
            }
        })
        res.json({
            data : product,
            message : "product",
            error : false,
            success : true
        })
    }catch(err){
        res.status(500).json({
            message: err.message || err,
            success:false,
            error:true
        })
    }
  };

  