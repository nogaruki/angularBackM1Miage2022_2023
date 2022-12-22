let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Student = Schema({
 id: Number,
 user_id: Number
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Student", Student);
