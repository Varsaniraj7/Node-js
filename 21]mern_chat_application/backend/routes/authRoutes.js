const express = require("express");
const router = express.Router();
const authCtl = require("../controllers/authCtl");
const protectRoute = require("../middleware/authMiddleware");

router.post("/signup", authCtl.signup);
router.post("/login", authCtl.login);
router.post("/logout", authCtl.logout);

router.put("/update-profile", protectRoute.protectRoute, authCtl.updateProfile)

router.get("/check", protectRoute.protectRoute, authCtl.checkAuth); 

module.exports = router; 