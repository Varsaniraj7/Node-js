const mongoose = require("mongoose");

const schema = mongoose.Schema({
    catName: {
        type: String,
        required: true
    },
    catImage: {
        type: String,
        required: true
    }
})

const catSchema = mongoose.model("Category",schema);
module.exports = catSchema;