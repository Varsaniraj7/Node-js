const catSchema = require("../modal/categorySchema")
const fs  = require("fs");
const path = require("path");

module.exports.addCategory = (req, res) => {
    res.render("addCategory");
}
module.exports.addCategoryData = async (req, res) => {
    req.body.catImage = req.file.path;
    await catSchema.create(req.body).then(() => {
        res.redirect("/category/addCategory");
    })
}
module.exports.viewCategory = async (req, res) => {
    await catSchema.find({}).then(category => {
        res.render("viewCategory", { category });
    })
}
module.exports.deleteCategory = async (req, res) => {
    const singleData = await catSchema.findById(req.params.id);
    fs.unlinkSync(singleData.catImage);
    await catSchema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/category/viewCategory");
    })
}
module.exports.editCategory = async (req,res)=>{
    await catSchema.findById(req.params.id).then((data) => {
        res.render("editCategory", { data });
    })
}

module.exports.editCategoryData = async (req,res)=>{
    const singleData = await catSchema.findById(req.body.id);
    let img;
    req.file ? img = req.file.path : img = singleData.catImage;
    req.file && fs.unlinkSync(singleData.catImage);
    req.body.catImage = img;
    await catSchema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/category/viewCategory")
    })
}