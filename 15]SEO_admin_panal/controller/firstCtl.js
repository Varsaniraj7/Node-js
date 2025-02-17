const adminschema = require("../modal/adminSchema")
const fs = require("fs");
const path = require("path");

module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.adminLogin = async (req, res) => {
    await adminschema.findOne({ email: req.body.email }).then((data) => {
        if (data.password == req.body.password) {
            res.cookie("adminData", data)
            res.redirect("/dashboard");
        } else {
            res.redirect("/");
        }
    })
}

module.exports.adminLogout = (req, res) => {
    res.clearCookie("adminData");
    res.redirect("/");
}

module.exports.dashboard = (req, res) => {
    // res.render("dashboard");
    req.cookies.adminData ? res.render("dashboard") : res.redirect("/");
}

module.exports.addAdmin = (req, res) => {
    req.cookies.adminData ? res.render("addAdmin") : res.redirect("/");
}

module.exports.addAdminData = async (req, res) => {
    req.body.image = req.file.path;
    await adminschema.create(req.body).then(() => {
        res.redirect("/dashboard");
    })
}

module.exports.viewAdmin = async (req, res) => {
    await adminschema.find({}).then(admin => {
        req.cookies.adminData ? res.render("viewAdmin", { admin }) : res.redirect("/");
    })
}

module.exports.deleteAdmin = async (req, res) => {
    const singleData = await adminschema.findById(req.params.id);
    fs.unlinkSync(singleData.image);
    await adminschema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/viewAdmin");
    })
}

module.exports.editAdmin = async (req, res) => {
    await adminschema.findById(req.params.id).then((data) => {
        req.cookies.adminData ? res.render("editAdmin", { data }) : res.redirect("/");
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

module.exports.AdminProfile = async (req, res) => {
    const adminData = req.cookies.adminData;
    if (!adminData) {
        return res.redirect("/");
    }
    const admin = await adminschema.findOne({ _id: adminData._id });
    if (!admin) {
        return res.redirect("/");
    }
    res.render("profile", { admin });
}