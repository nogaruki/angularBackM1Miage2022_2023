let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Comment = Schema({
 id: Number,
 teacher_id: String,
 assignment_id: Number,
 comment: String
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Comment", Comment);
