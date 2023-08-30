const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean },
});

module.exports = mongoose.model("User", User);
