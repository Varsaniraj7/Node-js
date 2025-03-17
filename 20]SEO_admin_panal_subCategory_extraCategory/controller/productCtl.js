const extraCategorySchema = require("../modal/extraCategorySchema");
const productSchema = require("../modal/productSchema")

module.exports.addProduct = async (req,res)=>{  
    await extraCategorySchema.find({}).then((data)=>{
        res.render("addProduct",{data}); 
    })
}

module.exports.addProductData = async (req,res)=>{
    req.body.productImage = req.file.path;
    await productSchema.create(req.body).then(()=>{
        res.redirect("/product/addProduct");
    })
}

module.exports.viewProduct = async (req,res)=>{
    await productSchema
    .find({})
    .populate({
        path:"extraCategoryTd",
        populate:{
            path:"subCategoryId",
            populate:{
                path:"categoryId"
            }
        }
    })
    .then((data)=>{
        res.render("viewProduct",{data})
    })
}