const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date },
});

module.exports = mongoose.model("Message", Message);
