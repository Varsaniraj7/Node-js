const schema = require("../modal/firstSchema")
const db = require("../config/db");
const fs = require("fs");
const path = require("path");


module.exports.home = async (req, res) => {
    await schema.find({}).then(data => {
        res.render("index", { data });
    });
}
module.exports.addMovie = (req, res) => {
    res.render("addMovie")
}


module.exports.addMovieData = async (req, res) => {
    req.body.img = req.file.path;
    await schema.create(req.body)
        .then(() => {            
            res.redirect("/");
        })

}

module.exports.deleteMovie = async (req, res) => {
    const singleData = await schema.findById(req.params.id);
    fs.unlinkSync(singleData.img);
    await schema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/");
    })
}

module.exports.editMovie = async (req, res) => {
    await schema.findById(req.params.id)
        .then((data) => {
            console.log(data);
            res.render("updateMovie", { data });
        });
};

module.exports.updateMovieData = async (req, res) => {
    const singleData = await schema.findById(req.body.id);
    console.log(singleData);
    let img;
    req.file ? img = req.file.path : img = singleData.img;
    req.file && fs.unlinkSync(singleData.img);
    req.body.image = img;
    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/")
    })

}