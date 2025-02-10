const schema = require("../modal/firstSchema");

module.exports.dashboard = (req, res) => {
    res.render("dashboard")
}
module.exports.addAdmin = (req, res) => {
    res.render("addAdmin")
}
module.exports.addAdminData = async (req, res) => {    
    console.log(req.body);
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
    // await schema.create(req.body)
    //     .then(() => {
    //         res.redirect("/addAdmin");
    //     })
}