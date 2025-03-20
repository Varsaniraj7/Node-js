const adminSchema = require("../model/adminSchema");
const path = require("path")
const fs = require("fs")

module.exports.addAdmin = async (req, res) => {
    req.body.adminImage = req.file.path;
    await adminSchema.create(req.body).then(() => {
        res.status(200).json({ msg: "Admin Added successfully" });
    })
}

module.exports.deleteAdmin = async (req, res) => {
    const singleData = await adminSchema.findById(req.params.id);
    fs.unlinkSync(singleData.adminImage);
    await adminSchema.findByIdAndDelete(req.params.id).then((deletedAdmin) => {
        if (deletedAdmin) {
            res.status(200).json({ msg: "Admin deleted successfully" });
        } else {
            res.status(404).json({ msg: "Admin not found" });
        }
    });
}

module.exports.viewAdmin = async (req, res) => {
    await adminSchema.find({}).then((admin) => {
        res.status(200).json({ admin });
    });

}

module.exports.editAdmin = async (req, res) => {
    const singleData = await adminSchema.findById(req.params.id);
    let img;
    req.file ? img = req.file.path : img = singleData.adminImage;
    req.file && fs.unlinkSync(singleData.adminImage);
    req.body.adminImage = img;
    await adminSchema.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.status(200).json({ msg: "admin updated succesfully" });
    })
}