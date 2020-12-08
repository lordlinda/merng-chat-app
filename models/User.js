const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});
// Compile model from schema
module.exports = mongoose.model("user", userSchema);
