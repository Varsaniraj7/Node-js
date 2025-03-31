const Article = require("../models/Article");

exports.getArticles = async (req, res) => {
  const articles = await Article.find().populate("author");
  res.render("articles/articleList", { articles });
};

exports.newArticle = (req, res) => {
  res.render("articles/articleForm");
};

exports.createArticle = async (req, res) => {
  const article = new Article({ title: req.body.title, content: req.body.content, author: req.user.id });
  await article.save();
  res.redirect("/articles");
};
