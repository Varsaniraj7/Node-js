const adminSchema = require("../model/registerSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.registerAdmin = async (req, res) => {
    let admin = await adminSchema.findOne({ email: req.body.email });
    if (admin) {
        return res.status(200).json({ msg: "admin already registered !" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    console.log(req.body.password);

    await adminSchema.create(req.body).then(() => {
        res.status(200).json({ msg: "admin registered successfully !" });
    })

}

module.exports.loginAdmin = async (req, res) => {
    let admin = await adminSchema.findOne({ email: req.body.email });
    if (!admin) {
        return res.status(200).json({ msg: "admin not registered !" });
    }
    if (await bcrypt.compare(req.body.password, admin.password)) {
        let token = jwt.sign({ admin }, "rnw", { expiresIn: "1h" })
        res.status(200).json({ msg: "admin login successfully !", token: token });
    } else {
        res.status(200).json({ msg: "Password is wrong !" });
    }
}