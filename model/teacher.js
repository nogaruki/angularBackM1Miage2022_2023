let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Teacher = Schema({
 id: Number,
 user_id: Number,
 picture: String //URL
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Teacher", Teacher);
