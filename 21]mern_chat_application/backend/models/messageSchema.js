const mongoose = require("mongoose");

const schema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    { timestamps: true }
);

const messageSchema = mongoose.model("Message",schema);

module.exports=messageSchema;