const express = require("express");
const router = express.Router();
const protectRoute = require("../middleware/authMiddleware");
const messageCtl  = require("../controllers/messageCtl");

router.get("/users", protectRoute.protectRoute,messageCtl.getUsersForSidebar);
router.get("/:id",protectRoute.protectRoute,messageCtl.getMessages);

router.post("/send/:id",protectRoute.protectRoute,messageCtl.sendMessage)

module.exports = router;