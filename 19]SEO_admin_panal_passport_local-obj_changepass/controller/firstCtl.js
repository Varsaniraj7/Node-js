const adminschema = require("../modal/adminSchema")
const fs = require("fs");
const path = require("path");
const mailer = require("../middleware/mailer");
const adminSchema = require("../modal/adminSchema");

module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.adminLogin = async (req, res) => {
    await adminschema.findOne({ email: req.body.email }).then((data) => {
        if (data.password == req.body.password) {
            // res.cookie("adminData", data)
            // req.flash("success","Login Successfully !");
            res.redirect("/dashboard");
        } else {
            res.redirect("/");
        }
    })
}

module.exports.adminLogout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports.dashboard = (req, res) => {
    res.render("dashboard");
}

module.exports.addAdmin = (req, res) => {
    res.render("addAdmin");
}

module.exports.addAdminData = async (req, res) => {
    req.body.image = req.file.path;
    await adminschema.create(req.body).then(() => {
        res.redirect("/dashboard");
    })
}

module.exports.viewAdmin = async (req, res) => {
    await adminschema.find({}).then(admin => {
        res.render("viewAdmin", { admin });
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
        res.render("editAdmin", { data });
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
    // const adminData = req.cookies.adminData;
    // if (!adminData) {
    //     return res.redirect("/");
    // }
    // const admin = await adminschema.findOne({ _id: adminData._id });
    // if (!admin) {
    //     return res.redirect("/");
    // }
    // res.render("profile", { admin });
    res.render("profile");
}

module.exports.changePass = (req, res) => {
    res.render("changePass");
}
module.exports.changePassword = async (req, res) => {
    let admin = req.user;
    if (req.body.oldPass == admin.password) {
        if (req.body.newPass != req.body.oldPass) {
            if (req.body.newPass == req.body.confirmPass) {
                await adminschema.findByIdAndUpdate(admin.id, { password: req.body.newPass }).then(() => {
                    res.redirect("/logout")
                })
            } else {
                res.redirect("/changePass");
            }
        } else {
            res.redirect("/changePass")
        }
    } else {
        res.redirect("/changePass")
    }
}

module.exports.forgetpassword = (req, res) => {
    res.render("forgetPassword");
}
module.exports.forgotpassword = async (req, res) => {
    let admin = await adminschema.findOne({ email: req.body.email });
    if (!admin) {
        return res.redirect("/forgetpassword");
    }
    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.adminData = admin;

    res.redirect("/forgototp");
}

module.exports.forgototp = (req, res) => {
    res.render("forgototp");
}

module.exports.resetpassword = async(req, res) => {
    let adminData = req.session.adminData;
    let otp = req.session.otp;
    if (otp == req.body.otp) {
        if (req.body.otp != req.body.newpass) {
            if (req.body.newpass == req.body.confirmpass) {
                await adminSchema.findByIdAndUpdate(adminData._id,{
                    password:req.body.confirmpass,
                })
                res.redirect("/")
            }
        } else {
            res.redirect("/forgetpassword")
        }
    } else {
        res.redirect("/forgetpassword")
    }
}