const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    text: String,
    article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});


const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;