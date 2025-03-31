const express = require("express");
const { getArticles, newArticle, createArticle } = require("../controllers/articleController");
const router = express.Router();

router.get("/", getArticles);
router.get("/new", newArticle);
router.post("/", createArticle);

module.exports = router;