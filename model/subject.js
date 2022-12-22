let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Subject = Schema({
 id: Number,
 title: String,
 picture: String //URL
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Subject", Subject);
