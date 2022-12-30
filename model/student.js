let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Student = Schema({
 _id: Number,
 username: String,
 email: String,
 password: String,
 prenom: String,
 nom: String
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Student", Student);
