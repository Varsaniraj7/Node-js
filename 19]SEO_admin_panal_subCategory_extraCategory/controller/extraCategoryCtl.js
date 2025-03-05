const subCategory = require("../modal/subCategorySchema");
const extraCategory = require("../modal/extraCategorySchema");

module.exports.addExtraCategory = async (req,res)=>{
    await subCategory.find({}).then((data)=>{
        res.render("addExtraCategory",{data});  
    })
}

module.exports.addExtraCategoryData = async (req,res)=>{
    await extraCategory.create(req.body).then(()=>{
        res.redirect("/extraCategory/addExtraCategory");
    })
}

module.exports.viewExtraCategory = async(req,res)=>{
    await extraCategory.find({}).populate("subCategoryId").then(extraCategory => {
        res.render("viewExtraCategory", { extraCategory });
    })
}