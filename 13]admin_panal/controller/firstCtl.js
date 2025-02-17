const adminschema = require("../modal/admin_schema");
const fs = require("fs");
const path = require("path");



module.exports.adminLogin = async (req,res)=>{
    await adminschema.findOne({email:req.body.email}).then((data)=>{
        if(data.password == req.body.password){
            res.cookie("adminData",data)
            res.redirect("/dashboard");
        }else{
            res.redirect("/");
        }
    })
}

module.exports.adminLogout = async (req,res)=>{
    res.clearCookie("adminData");
    res.redirect("/")
}

module.exports.admin = (req, res) => {
    res.render("login")
}

module.exports.dashboard = (req, res) => {
    req.cookies.adminData ? res.render("dashboard") : res.redirect("/");
}

module.exports.addAdmin = (req, res) => {
    res.render("addAdmin")
}

module.exports.addAdminData = async (req, res) => {    
    req.body.image = req.file.path;
    await adminschema.create(req.body).then(()=>{
        res.redirect("/viewAdmin");
    })
}

module.exports.viewAdmin =  async (req, res) => {
    await adminschema.find({}).then(admin => {
        res.render("viewAdmin", { admin });
    });
}

module.exports.deleteAdmin = async(req,res) =>{
    const singleAdmin = await adminschema.findById(req.params.id);
    fs.unlinkSync(singleAdmin.image);
    await adminschema.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect("/viewAdmin");
    })
}

module.exports.editAdmin = async(req,res)=>{
    await adminschema.findById(req.params.id).then((data)=>{
        res.render("editAdmin",{data})
    })
}

module.exports.editAdminData = async (req, res) => {    
    const singleData = await adminschema.findById(req.body.id);
    let img;
    req.file ? img = req.file.path : img = singleData.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;
    await adminschema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/viewAdmin")
    })
}