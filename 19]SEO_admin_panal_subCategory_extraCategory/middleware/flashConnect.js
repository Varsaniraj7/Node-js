module.exports.setFlash = (req,res,next)=>{
    res.locals.flash = {
        success:req.flash("Success"),
        error:req.flash("error")
    };
    next();
}