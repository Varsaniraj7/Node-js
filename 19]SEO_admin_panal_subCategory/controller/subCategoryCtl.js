const catSchema = require("../modal/categorySchema");
const subCatSchema = require("../modal/subCategorySchema");

module.exports.addSubCategory = async (req,res)=>{
    await catSchema.find({}).then((data)=>{
        res.render("addSubCategory",{data})
    })
}

module.exports.addSubCategoryData = async(req,res)=>{
    console.log(req.body);
    await  subCatSchema.create(req.body).then(()=>{
        res.redirect("/subCategory/addSubCategory");
    })
}

module.exports.viewSubCategory = async(req,res)=>{
    await subCatSchema.find({}).populate("categoryId").then(subCategory => {
        console.log(subCategory);
        
        res.render("viewSubCategory", { subCategory });
    })
}