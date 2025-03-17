const mongoose = require("mongoose");

const schema = mongoose.Schema({
    extraCatName: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
        required: true
    }
});

const extraCategory = mongoose.model("extraCategory", schema);

module.exports = extraCategory;